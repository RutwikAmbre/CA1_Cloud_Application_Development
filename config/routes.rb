Rails.application.routes.draw do
  get "posts/index"
  get "posts/show"
  get "posts/create"
  get "posts/new"
  get "posts/edit"
  get "posts/update"
  get "posts/destroy"

  root "posts#index"

  #devise_for :users

  resources :posts, param: :id, only: [:index, :create, :update, :destroy, :edit, :show, :new]

  namespace :api do
    get "posts/index"
    get "posts/show"
    get "posts/create"
    resources :posts, only: [:index, :show, :create, :update] # Adjust the actions you need
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  
  # Defines the root path route ("/")

end
