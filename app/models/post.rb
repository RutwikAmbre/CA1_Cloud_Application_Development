class Post < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  # Ensures the slug is unique
  validates :title, presence: true
  validates :content, presence: true
  validates :slug, uniqueness: true

  def should_generate_new_friendly_id?
    title_changed? # This ensures the slug regenerates when the title changes
  end

  def to_param
    id.to_s
  end
end
