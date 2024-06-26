
function loglik(θ::Vector{Float64}, 
                X::Matrix{Float64}, 
                k::Int64,
                n_β::Int64,
                n_β_ns::Int64,
                intercept::String,
                switching_var::Bool,
                logsum::Bool=true)

    T      = size(X)[1]
    ξ      = zeros(T, k)  # unconditional transition probabilities at t
    L      = zeros(T)     # likelihood 
    ξ_next = zeros(k)     # unconditional transition probabilities at t+1

    σ, β, P = trans_θ(θ, k, n_β, n_β_ns, intercept, switching_var, false)
    
    ξ_0 = ergodic_probs(P, k)
    ξ_0 = any(ξ_0 .< 0) ? ones(k) ./ k : ξ_0 # numerical stability check

    # f(y | S_t, x, θ, Ψ_t-1) density function 
    η = reduce(hcat, [pdf.(Normal.(view(X, :,2:n_β+n_β_ns+2)*β[i], σ[i]), view(X, :,1)) for i in 1:k])
    # η = Matrix{Float64}(undef, size(X, 1), k)

    # for i in 1:k
    #     η[:, i] = pdf.(Normal.(view(X, :, 2:(n_β+n_β_ns+2))*β[i], σ[i]), view(X, :, 1))
    # end
    
    # if there is an underflow error for some reason I added this:
    #η .+= 1e-30 
    # but it may alter the estimations in some cases. Same in TVTP

    @inbounds for t in 1:T
        ξ[t,:] = t == 1 ? ξ_0 : view(ξ, t-1, :)
        #ξ_next = P'ξ[t, :]
        #P = P_tvtp(x_tvtp[t], δ, k)
        mul!(ξ_next, P, view(ξ, t, :))  # same as: ξ_next  = P*view(ξ, t, :)
        L[t] = view(η, t, :)'ξ_next
        @views @. ξ[t,:] = (1/L[t]) * ξ_next * η[t, :]
    end

    return (logsum ? sum(log.(L)) : L ), ξ #sum(log.(L)), ξ
end

function loglik_tvtp(θ::Vector{Float64}, 
                    X::Matrix{Float64}, 
                    k::Int64,
                    n_β::Int64,
                    n_β_ns::Int64,
                    intercept::String,
                    switching_var::Bool,
                    n_δ::Int64,
                    logsum::Bool=true)

    T      = size(X)[1]
    ξ      = zeros(T, k)  # unconditional transition probabilities at t
    L      = zeros(T)     # likelihood 
    ξ_next = zeros(k)     # unconditional transition probabilities at t+1
    x_tvtp = X[:, end-n_δ+1:end]
    X      = X[:, 1:(end-n_δ)]
    
    #δ = θ[(end-(n_δ*k^2)+1):end]
    δ = θ[(end-(n_δ*k*(k-1))+1):end]
    σ, β = trans_θ(θ, k, n_β, n_β_ns, intercept, switching_var, true)

    # TO DO: use the same function as in the non-tvtp case but with tvtp
    ξ_0 = ones(k) ./ k
    
    # f(y | S_t, x, θ, Ψ_t-1) density function 
    η = reduce(hcat, [pdf.(Normal.(view(X, :,2:n_β+n_β_ns+2)*β[i], σ[i]), view(X, :,1)) for i in 1:k])
    #η .+= 1e-30

    @inbounds for t in 1:T
        ξ[t,:] = t == 1 ? ξ_0 : view(ξ, t-1, :)
        #ξ_next = P'ξ[t, :]
        P = P_tvtp(x_tvtp[t, :], δ, k, n_δ)
        mul!(ξ_next, P, view(ξ, t, :))  # same as: ξ_next  = P*view(ξ, t, :)
        L[t] = view(η, t, :)'ξ_next
        @views @. ξ[t,:] = (1/L[t]) * ξ_next * η[t, :]
    end

    return (logsum ? sum(log.(L)) : L ), ξ #sum(log.(L)), ξ
end
