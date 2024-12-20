// app/javascript/application.js

// Sprockets-style requires for legacy Rails asset pipeline (optional, but if needed)
require("rails-ujs");
require("turbo-rails");
require.context("./controllers", true, /\.js$/); // Automatically imports all controllers

// Import Turbo (via turbo-rails package)
import { Turbo } from "turbo-rails";
Turbo.drive.drive = true;

// Import Stimulus controllers (if you're using Stimulus)
import "./controllers";
