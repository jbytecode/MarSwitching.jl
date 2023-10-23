var documenterSearchIndex = {"docs":
[{"location":"man/docstrings/#Docstrings","page":"API","title":"Docstrings","text":"","category":"section"},{"location":"man/docstrings/","page":"API","title":"API","text":"tip: You may also use help mode `?`\nYou can access the docstring of every function listed here by typing ? in Julia's REPL followed by the function name. For example, ?MSModel will show the docstring for the MSModel function.","category":"page"},{"location":"man/docstrings/","page":"API","title":"API","text":"MarSwitching.jl exports following list of functions (and a struct):","category":"page"},{"location":"man/docstrings/","page":"API","title":"API","text":"","category":"page"},{"location":"man/docstrings/#Model-estimation","page":"API","title":"Model estimation","text":"","category":"section"},{"location":"man/docstrings/","page":"API","title":"API","text":"MarSwitching.MSM\nMarSwitching.MSModel\nMarSwitching.grid_search_msm","category":"page"},{"location":"man/docstrings/#MarSwitching.MSM","page":"API","title":"MarSwitching.MSM","text":"Struct MSM holds the parameters of the model, data and some other information. Is returned by the function MSModel.\n\n\n\n\n\n","category":"type"},{"location":"man/docstrings/#MarSwitching.MSModel","page":"API","title":"MarSwitching.MSModel","text":"MSModel(y::VecOrMat{V},\n        k::Int64, \n        ;intercept::String = \"switching\",\n        exog_vars::VecOrMat{V},\n        exog_switching_vars::VecOrMat{V},\n        switching_var::Bool = true,\n        exog_tvtp::VecOrMat{V},\n        x0::Vector{V},\n        algorithm::Symbol = :LN_SBPLX,\n        maxtime::Int64 = -1,\n        random_search::Int64 = 0) where V <: AbstractFloat\n\nFunction to estimate the Markov Switching Model. Returns an instance of MSM struct.\n\nNote: The model likelihood function is very nonlinear and prone to local maxima. Increasing number of random searches can help, for the cost of longer training time. For the same reason, it is recommended not to estimate model with many states (e.g. more than 5), altough it is possible.\n\nArguments\n\ny::VecOrMat{V}: dependent variable.\nk::Int64: number of states.\nintercept::String: \"switching\" or \"non-switching\" or \"no\".\nexog_vars::VecOrMat{V}: optional exogenous variables for the non-switching part of the model.\nexog_switching_vars::VecOrMat{V}: optional exogenous variables for the switching part of the model.\nswitching_var::Bool: is variance state dependent?\nexog_tvtp::VecOrMat{V}: optional exogenous variables for the tvtp part of the model.\nx0::Vector{V}: initial guess for the parameters. If empty, the initial guess is generated from k-means clustering.\nalgorithm::Symbol: optimization algorithm to use. One of [:LDVAR2, :LDVAR1, :LDLBFGS, :LNSBPLX]\nmaxtime::Int64: maximum time in seconds to run the optimization. If negative, the maximum time is equal T/2.\nrandom_search_em::Int64: number of random searches to perform for the EM algorithm. If 0, no random search is performed.\nrandom_search::Int64: number of random searches to perform. \nverbose::Bool: if true, prints out the progress of the random searches.\n\nReferences:\n\nHamilton, J. D. (1989). A new approach to the economic analysis of nonstationary time series and the business cycle. Econometrica: Journal of the Econometric Society, 357-384.\nFilardo, Andrew J. (1994). Business cycle phases and their transitional dynamics. Journal of Business & Economic Statistics, 12(3), 299-308.\n\nSee also grid_search_msm.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.grid_search_msm","page":"API","title":"MarSwitching.grid_search_msm","text":"grid_search_msm(y::VecOrMat{V}, \n                x::VecOrMat{V},\n                criterion::String = \"AIC\";\n                k::Vector{Int64} = [2,3,4],\n                intercept::Vector{String} = [\"switching\", \"non-switching\"],\n                vars::Vector{Vector{String}},\n                switching_var::Vector{Bool} = [true, false],\n                random_n::Int64,\n                random_search_em::Int64 = 0,\n                random_search::Int64 = 0,\n                verbose::Bool = true,\n                algorithm::Symbol = :LN_SBPLX,\n                maxtime::Int64 = -1) where V <: AbstractFloat\n\nFunction for exhaustive or random search over specified parameter values for a Markov switching model.\n\nReturns a selected MSM model, vector of criterion values and a vector of tuples containing parameter space.\n\nNote: Unless the data is of small size (both dimensions), it is best to limit the parameter space by providing smaller possible parameters or by chosing random number of parameters to evaluate.\n\nArguments\n\ny::VecOrMat{V}: dependent variable.\nx::VecOrMat{V}: independent variables.\ncriterion::String: criterion to use for model selection. One of \"AIC\" (default) or \"BIC\".\nk::Int64: vector of states to evaluate.\nintercept::String: vector of \"switching\", \"non-switching\" or \"no\".\nvars::Vector{Vector{String}}: vector of vectors with either \"switching\" or \"non-switching\" for corresponding variables in x argument.\nswitching_var::Vector{Bool}: vector of booleans for variance state dependency.\nswitching_var::Bool: is variance state dependent?\nrandom_n::Int64: number of random parameters combinations to evaluate. If negative, performs an exhaustive grid search.\nrandom_search_em::Int64: number of random searches to perform for the EM algorithm in eery model estimation. If 0, no random search is performed.\nrandom_search::Int64: number of random searches to perform. \nalgorithm::Symbol: optimization algorithm to use. One of [:LDVAR2, :LDVAR1, :LDLBFGS, :LNSBPLX]\nmaxtime::Int64: maximum time in seconds to run the optimization. If negative, the maximum time is equal T/2.\nverbose::Bool: if true, prints out the progress of the grid/random search.\n\nSee also MSModel.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#Simulation","page":"API","title":"Simulation","text":"","category":"section"},{"location":"man/docstrings/","page":"API","title":"API","text":"MarSwitching.generate_msm(model::MSM, T::Int64 = 0)\nMarSwitching.generate_msm(μ::Vector{V},\n                        σ::Vector{V},\n                        P::Matrix{V},\n                        T::Int64;\n                        β::Vector{V} = Vector{V}([]),\n                        β_ns::Vector{V} = Vector{V}([]),\n                        δ::Vector{V} = Vector{V}([]),\n                        tvtp_intercept::Bool = true) where V <: AbstractFloat","category":"page"},{"location":"man/docstrings/#MarSwitching.generate_msm","page":"API","title":"MarSwitching.generate_msm","text":"generate_msm(model::MSM, T::Int64)\n\nWhen applied to estimated model, generates artificial data of size T from the model.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.generate_msm-Union{Tuple{V}, Tuple{Vector{V}, Vector{V}, Matrix{V}, Int64}} where V<:AbstractFloat","page":"API","title":"MarSwitching.generate_msm","text":"generate_msm(μ::Vector{Float64}, σ::Vector{Float64}, P::Matrix{Float64}, T::Int64; <keyword arguments>)\n\nGenerate artificial data from Markov switching model from provided parameters. Returns a tuple of (y, s_t, X) where y is the generated data, s_t is the state sequence and X is the design matrix.\n\nNote, in order to have non-switching parameter provide it k-times.\n\nArguments\n\nμ::Vector{AbstractFloat}: intercepts for each state.\nσ::Vector{AbstractFloat}: standard deviations for each state.\nP::Matrix{AbstractFloat}: transition matrix.\nT::Int64: number of observations to generate.\nβ::Vector{AbstractFloat}: switching coefficients. (first k elements in vector are coefficeints of first state equation).\nβ_ns::Vector{AbstractFloat}: non-switching coefficients.\nδ::Vector{AbstractFloat}: tvtp coefficients.\ntvtp_intercept::Bool: whether to include an intercept in the tvtp model.\n\n\n\n\n\n","category":"method"},{"location":"man/docstrings/#Model-summary","page":"API","title":"Model summary","text":"","category":"section"},{"location":"man/docstrings/","page":"API","title":"API","text":"MarSwitching.summary_msm\nMarSwitching.transition_mat\nMarSwitching.state_coeftable\nMarSwitching.coeftable_tvtp\nMarSwitching.get_std_errors","category":"page"},{"location":"man/docstrings/#MarSwitching.summary_msm","page":"API","title":"MarSwitching.summary_msm","text":"summary_msm(model::MSM; digits::Int64=3)\n\nReturns formated summary table of estimated model. It's built from summary_msm, state_coeftable and coeftable_tvtp functions.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.transition_mat","page":"API","title":"MarSwitching.transition_mat","text":"transition_mat(model::MSM; digits::Int64=2)\n\nReturns formated table of estimated transition matrix probabilities. It's one of the functions called by the summary_msm function.\n\nSee also summary_msm, state_coeftable, coeftable_tvtp.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.state_coeftable","page":"API","title":"MarSwitching.state_coeftable","text":"state_coeftable(model::MSM, state::Int64; digits::Int64=3)\n\nReturns formated table of coefficients and their statistics for a given state.     It's one of the functions called by the summary_msm function.\n\nSee also summary_msm, coeftable_tvtp, transition_mat.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.coeftable_tvtp","page":"API","title":"MarSwitching.coeftable_tvtp","text":"coeftable_tvtp(model::MSM; digits::Int64=3)\n\nReturns formated table of estimated coefficients from TVTP model and their statistics. It's one of the functions called by the summary_msm function.\n\nSee also summary_msm, state_coeftable, transition_mat.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.get_std_errors","page":"API","title":"MarSwitching.get_std_errors","text":"get_std_errors(model::MSM)\n\nReturns standard errors of the estimated parameters.  The errors are calculated with finite difference hessian od the log-likelihood function.\n\nThe output is a vector of standard errors in order given by raw_params field of the model.\n\nThe formula is squared diagonal values of the inverse (moore-penrose) of the hessian matrix:\n\n(-fracpartial^2 mathcalL(mathbftheta)partial mathbftheta mathbftheta)^-1\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#Model-inference","page":"API","title":"Model inference","text":"","category":"section"},{"location":"man/docstrings/","page":"API","title":"API","text":"MarSwitching.filtered_probs\nMarSwitching.smoothed_probs\nMarSwitching.predict\nMarSwitching.expected_duration\nMarSwitching.ergodic_probs","category":"page"},{"location":"man/docstrings/#MarSwitching.filtered_probs","page":"API","title":"MarSwitching.filtered_probs","text":"filtered_probs(model::MSM; kwargs...)\n\nReturns filtered probabilities of each state at each time period. If only model is provided, in-sample data is used.\n\nFiltered probabilites, unlike smoothed probabilites, are calculated using data available up to time T.\n\nArguments\n\nmodel::MSM: estimated model.\ny: optional data for dependent variabla.\nexog_vars: optional exogenous variables for the non-switching part of the model.\nexog_switching_vars: optional exogenous variables for the switching part of the model.\nexog_tvtp: optional exogenous variables for the tvtp part of the model.\n\nSee also smoothed_probs and expected_duration.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.smoothed_probs","page":"API","title":"MarSwitching.smoothed_probs","text":"smoothed_probs(model::MSM; kwargs...)\n\nReturns smoothed probabilities of each state at each time period (Kim, 1994). If only MSM model is provided, in-sample data is used.\n\nSmoothed probabilites, unlike filtered probabilites, are calculated using all available data.\n\nArguments\n\nmodel::MSM: estimated model.\ny: optional data for dependent variabla.\nexog_vars: optional exogenous variables for the non-switching part of the model.\nexog_switching_vars: optional exogenous variables for the switching part of the model.\nexog_tvtp: optional exogenous variables for the tvtp part of the model.\n\nSee also filtered_probs and expected_duration.\n\nReferences\n\nKim, Chang Jin (1994). Dynamic Linear Models with Markov-Switching. Journal of Econometrics 60, 1-22.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.predict","page":"API","title":"MarSwitching.predict","text":"predict(model::MSM, instanteous::Bool = false; kwargs...)\n\nProvide either instanteous or one-step-ahead prediction of the dependent variable.    \n\nWhich is the probability weighted average of predictions of each state equation:\n\nhaty_t = sum_i=1^k hatxi_itX_thatbeta_i\n\nAnd for one step ahead, the state probabilities have to be predicted themselves:\n\nhaty_t+1 = sum_i=1^k (Phatxi_it)X_t+1hatbeta_i\n\nIf only MSM model is provided, in-sample data is used.\n\nReturns a tuple of (ŷ, ξ_t) where ŷ is the predicted value of the dependent variable and ξ_t is the filtered probabilities of each state at each time period.\n\nArguments\n\nmodel::MSM: estimated model.\ny: optional data for dependent variabla.\nexog_vars: optional exogenous variables for the non-switching part of the model.\nexog_switching_vars: optional exogenous variables for the switching part of the model.\nexog_tvtp: optional exogenous variables for the tvtp part of the model.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.expected_duration","page":"API","title":"MarSwitching.expected_duration","text":"expected_duration(model::MSM, exog_tvtp::VecOrMat{AbstractFloat})\n\nFor non-TVTP model, returns Vector of expected duration of each state. For TVTP model, returns a matrix of expected duration of each state at timt t.    \n\nformula: 1 / (1 - P[i,i]) or for TVTP - 1 / (1 - P[i,i, t])\n\nArguments\n\nmodel::MSM: estimated model.\nexog_tvtp::VecOrMat{AbstractFloat}: optional exogenous variables for the tvtp model. If not provided, in-sample data is used.\n\nSee also ergodic_probs.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#MarSwitching.ergodic_probs","page":"API","title":"MarSwitching.ergodic_probs","text":"ergodic_probs(P::Matrix{Float64})\n\nReturns a k-size Vector of ergodic probabilites of each state.     \n\nThe ergodic probabilites (also known as long-term probabilites) of a Markov process are the probabilites that satisfy the following equation:\n\nlim_ntoinfty P^n = pi = P pi \n\nThe ergodic probability is proportional to the eigenvector of the transition matrix P associated to the unit eigenvalue.\n\nArguments\n\nP::Matrix{Float64}: left stochastic transition matrix.\n\nSee also expected_duration.\n\n\n\n\n\nergodic_probs(model::MSM, exog_tvtp::VecOrMat{V})\n\nwhen applied to the model non-TVTP model, returns a k-size Vector of ergodic probabilites of each state.      For TVTP model, returns T times K a matrix of ergodic probabilites of each state at time t.\n\nArguments\n\nmodel::MSM: estimated model.\nexog_tvtp::VecOrMat{AbstractFloat}: optional exogenous variables for the tvtp model. If not provided, in-sample data is used.\n\nSee also expected_duration.\n\n\n\n\n\n","category":"function"},{"location":"man/docstrings/#Other","page":"API","title":"Other","text":"","category":"section"},{"location":"man/docstrings/","page":"API","title":"API","text":"MarSwitching.add_lags","category":"page"},{"location":"man/docstrings/#MarSwitching.add_lags","page":"API","title":"MarSwitching.add_lags","text":"add_lags(y::Vector{Float64}, p::Int64)\n\nGiven a vector y of length T, returns a matrix of size (T-p) x (p+1) where the first column is y[p+1:T], second column is y[p:T-1] and so on.    \n\n\n\n\n\n","category":"function"},{"location":"man/get_started/#Getting-started","page":"Getting started","title":"Getting started","text":"","category":"section"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"Following example will estimate a simple Markov switching model with regime dependent intercept, exogenous variable and variance. The model is defined as follows:","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"beginalign*\n    y_t = mu_s + beta_s x_t + epsilon_t  epsilon sim mathbbN(0mathcalSigma_s) \nendalign*","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"beginequation*\n    P(S_t = i  S_t-1 = j) = beginbmatrix\n        p_1  1 - p_2\n        1 - p_1  p_2\n        endbmatrix\nendequation*","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"using MarSwitching\nusing Random\nusing Statistics\n\nk = 2            # number of regimes\nT = 400          # number of generated observations\nμ = [1.0, -0.5]  # regime-switching intercepts\nβ = [-1.5, 0.0]  # regime-switching coefficient for β\nσ = [1.1,  0.8]  # regime-switching standard deviation\nP = [0.9 0.05    # transition matrix (left-stochastic)\n     0.1 0.95]\n\nRandom.seed!(123)\n\n# generate artificial data with given parameters\ny, s_t, X = generate_msm(μ, σ, P, T, β = β) \n\n# estimate the model\nmodel = MSModel(y, k, intercept = \"switching\", exog_switching_vars = X[:,2])\n\n# we may simulated data also from estimated model\n# e.g. for calculating VaR:\nquantile(generate_msm(model, 1000)[1], 0.05)\n\n# or more interestingly, output summary table\nsummary_msm(model)","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"The estimated model has a following form:","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"y_t = \nbegincases\n    082 - 148 times x_t + epsilon_1t  epsilon_1 sim mathbbN(0112)  textfor  S_t = 1\n    -051 - 0003 times x_t + epsilon_2t  epsilon_2 sim mathbbN(0084)  textfor  S_t = 2\nendcases","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"beginequation*\n    P(S_t = i  S_t-1 = j) = beginbmatrix\n        9118  35 \n        882  965\n        endbmatrix\nendequation*","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"The package also provides a functions for filtered transition probabilites P(S_t = i  Psi_t), as well as smoothed ones P(S_t = i  Psi_T). Essentially, the difference is that in order to calculate the smoothed probabilites the whole sample is used.","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"using Plots\n\nplot(filtered_probs(model),\n     label     = [\"Regime 1\" \"Regime 2\"],\n     title     = \"Transition probabilities\", \n     linewidth = 2)","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"(Image: Plot)","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"using Plots\n\nplot(smoothed_probs(model),\n     label     = [\"Regime 1\" \"Regime 2\"],\n     title     = \"Smoothed transition probabilities\", \n     linewidth = 2)","category":"page"},{"location":"man/get_started/","page":"Getting started","title":"Getting started","text":"(Image: Plot)","category":"page"},{"location":"#MarSwitching.jl:-Markov-Switching-dynamic-models-in-Julia","page":"Home","title":"MarSwitching.jl: Markov Switching dynamic models in Julia","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Build Status) (Image: Build status) (Image: codecov) (Image: License: MIT)","category":"page"},{"location":"","page":"Home","title":"Home","text":"MarSwitching.jl is a package for estimating Markov switching dynamic models (also called regime switching) for Julia. This is a class of models with time-varying coefficients depending on an unobservable state/regime that follows Markov process. The package provides tools for estimation, inference and simulation of the models. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Author: Mateusz Dadej, m.dadej at unibs.it","category":"page"},{"location":"","page":"Home","title":"Home","text":"info: Star it on GitHub!\nIf you have found this package useful, please consider starring it on GitHub.<script async defer src=\"https://buttons.github.io/buttons.js\"></script>\n\n<a class=\"github-button\" \nhref=\"https://github.com/m-dadej/MarSwitching.jl\" \ndata-icon=\"octicon-star\" \ndata-size=\"large\" \ndata-show-count=\"true\" \naria-label=\"Star alan-turing-institute/MLJ.jl on GitHub\">\nStar</a>","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"MarSwitching is in general registry. To install simply enter ] in the Julia's REPL and use following command:","category":"page"},{"location":"","page":"Home","title":"Home","text":"pkg> add MarSwitching","category":"page"},{"location":"","page":"Home","title":"Home","text":"Assuming that you already have at least Julia 1.6 (stable version) installed.","category":"page"},{"location":"#Functionality","page":"Home","title":"Functionality","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Currently available:\nMarkov switching model with k regimes and combinations of switching/non-switching:\nintercept\nvariance\nexogenous variables\nmodel with time-varying transition probabilites (TVTP) (à la Filardo 1994) \nFiltered probabilites\nSmoothed probabilites (Kim, 1994)\nSummary statistics of coefficients\ninstantaneous and one step ahead predict()\nExpected regime duration\nSimulation of data both from estimated model and from given parameters\nPlanned functionality:\nother error distributions (student-t, GED, etc.)\nvariable and number of states selection\nMarkov Switching GARCH model\nMarkov Switching VAR model\nMarkov Switching model with lagged states. E.g. y_t = mu_S_t + phi(y_t-1 - mu_S_t-1)","category":"page"},{"location":"#Markov-regime-switching-model-in-a-nutshell","page":"Home","title":"Markov regime switching model in a nutshell","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The markov switching models are a class of models that allow for the parameters to change over time, depending on the unobservable state like economic recession, high volatility on financial markets or epidemiologic outbreak. The state follows markov process with a given probability transition matrix for each of k states:","category":"page"},{"location":"","page":"Home","title":"Home","text":"beginequation*\nP(S_t = i  S_t-1 = j) = \nbeginpmatrix\np_11  p_12  cdots  p_1k \np_21  p_22  cdots  p_2k \nvdots   vdots   ddots  vdots  \np_k1  p_k2  cdots  p_kk \nendpmatrix\nendequation*","category":"page"},{"location":"","page":"Home","title":"Home","text":"Satisfying standard markovian properties. The general model is defined as follows:","category":"page"},{"location":"","page":"Home","title":"Home","text":"beginalign*\nmathbfy_t = mathbfmu_S + mathbfbeta_S mathbfX_t + mathbfgammamathbfZ_t + mathbfepsilon_t  mathbfepsilon sim f(0mathcalSigma_s)\nendalign*","category":"page"},{"location":"","page":"Home","title":"Home","text":"Where mathbfy_t is vector of dependent variables, mathbfmu_s and mathbfbeta_s are model parameters dependent on the state S_t, mathbfgamma is a vector of parameters for exogenous variables. The error is distributed according to some distribution f with state dependent covariance matrix mathcalSigma_s. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Because of the unobserved nature of the state, the model is estimated by maximum likelihood. The likelihood function is calculated using the method described in Hamilton, 1989.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The package also provide time-varying transition probabilities (TVTP) (Filardo, 1994) which allows for the transition matrix to change over time. Each transition probability has a following form:","category":"page"},{"location":"","page":"Home","title":"Home","text":"p_ijt = dfracexp(delta_ijmathbfZ_t)textstyle sum_j=1 exp(delta_ijmathbfZ_t)","category":"page"}]
}