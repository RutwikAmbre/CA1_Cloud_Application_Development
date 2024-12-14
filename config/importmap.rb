# config/importmap.rb
# Pin npm packages by running ./bin/importmap pin <npm-package-name>
pin "application", preload: true
pin "jquery", to: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
pin "stimulus", to: "https://cdn.jsdelivr.net/npm/stimulus@2.0.0/dist/stimulus.min.js"
pin_all_from "app/javascript/controllers", under: "controllers"
