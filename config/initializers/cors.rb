Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "*"  # Update with specific origins, or leave '*' for all origins
      resource "*", headers: :any, methods: [ :get, :post, :put, :patch, :delete ]
    end
end
