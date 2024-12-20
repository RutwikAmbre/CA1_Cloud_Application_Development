// app/javascript/application.js
//= require rails-ujs
//= require_tree .

// Import Turbo and other libraries if needed

import { Turbo } from "turbo-rails";
Turbo.drive.drive = true;

import "./controllers"; // For Stimulus controllers
