class Post < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  # Ensures the slug is unique
  validates :slug, uniqueness: true
  validates :title, presence: true, length: { maximum: 20 }
  validates :content, presence: true, length: { minimum: 50 }

end

