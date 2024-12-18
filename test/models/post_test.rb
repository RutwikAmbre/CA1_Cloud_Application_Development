require "test_helper"

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  #test "should not save post without title" do
  #  post = Post.new(content: "Sample content")
  #  assert_not post.save, "Saved the post without a title"
  #end

  #test "should not save post with content less than 50 characters" do
  #  post = Post.new(title: "Sample Title", content: "Too short")
  #  assert_not post.save, "Saved the post with content less than 50 characters"
  #end
  
  #test "should not save post with title exceeding 100 characters" do
  #  long_title = "A" * 20
  #  post = Post.new(title: long_title, content: "Valid content with enough characters.")
  #  assert_not post.save, "Saved the post with a title exceeding 100 characters"
  #end

end
