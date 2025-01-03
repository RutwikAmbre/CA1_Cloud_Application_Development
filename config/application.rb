require_relative "boot"
# Instead of require "rails/all", require only the necessary parts
require "rails/all"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_text/engine"
require "action_cable/engine"
require "rails/test_unit/railtie"


# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BlogApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0
    
    #config.eager_load_paths += %W(#{config.root}/app/controllers/)
    #config.eager_load_paths += %W(#{config.root}/app/controllers/api)

    config.autoload_lib(ignore: %w[assets tasks])

    config.assets.enabled = false

    # config.assets.compile = true

    # config.api_only = true

    config.assets.precompile += %w[ application.js application.css ]

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "*" # Replace '*' with specific origins if needed
        resource "*", headers: :any, methods: [ :get, :post, :put, :patch, :delete, :options ]
      end
    end

    config.autoload_paths += %W(#{config.root}/app/controllers/api)

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.


    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
