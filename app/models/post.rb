class Post < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  # Ensures the slug is unique
  validates :slug, uniqueness: true
  validates :title, presence: true 
  validates :content, presence: true 

end

