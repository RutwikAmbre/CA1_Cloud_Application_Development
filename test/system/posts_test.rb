require "application_system_test_case"

class PostsTest < ApplicationSystemTestCase

  setup do
    @post = Post.create!(title: "Test Title", content: "Test content", slug: "test-slug")
  end

  test "visiting the index" do
    visit posts_url
    assert_selector "h1", text: "Posts"
  end

  test "should create post" do
    visit posts_url
    click_on "New post"

    fill_in "content", with: "New content"
    fill_in "slug", with: "new-slug"
    fill_in "title", with: "New Title"
    click_on "create Post"

    assert_text "Post was successfully created"
  end

  test "should update Post" do
    visit post_url(@post)  # Corrected to visit the show page of the specific post
    # click_on "Edit", match: :first

    fill_in "content", with: "Updated content"
    fill_in "title", with: "Updated Title"
    click_on "Update Post"

    assert_text "Post was successfully updated"
    assert redirect_to post_url(@post)
  end

  test "should destroy Post" do
    visit post_url(@post)
    click_on "Delete", match: :first
    
    # Wait for the page to update
    assert_no_text @post.title, wait: 5  # Wait for the title to disappear
    assert_text "Post was successfully destroyed"
  end
  
end
