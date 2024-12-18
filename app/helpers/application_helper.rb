# app/helpers/application_helper.rb
module ApplicationHelper
    def assembly_to_s(assembly)
      "Assembly with ID: #{assembly.id} and name: #{assembly.name}"
    end
end
