require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest

  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one)
    sign_in @user
    @post = Post.create(title: "Existing Title", content: "Existing content", slug: "existing-post")
  end

  test "should get index" do
    get posts_url
    assert_response :success
  end

  test "should get new" do
    get new_post_url
    assert_response :success
  end

  test "should create post" do
    # Provide valid attributes for a new post
    valid_attributes = { content: "New content", slug: "new-post", title: "New Title" }

    assert_difference("Post.count", 1) do
      post posts_url, params: { post: valid_attributes }
    end

    # Ensure the newly created post redirects to its show page
    assert_redirected_to post_url(Post.last)
  end

  #test "should show post" do
  #  get post_url(@post)
  #  assert_response :success
  #end

  #test "should get edit" do
  #  get edit_post_url(@post)
  #  assert_response :success
  #end

  #test "should update post" do
    # Provide updated attributes for the post
  #  updated_attributes = { title: "Updated Title", content: "Updated content", slug: "updated-post"  }

  #  patch post_url(@post), params: { post: updated_attributes }

    # Reload the post to ensure changes were applied
  #  @post.reload
  #  assert_equal "Updated content", @post.content
  #  assert_equal "updated-post", @post.slug
  #  assert_equal "Updated Title", @post.title

    # Ensure the post redirects to its show page after updating
  #  assert_redirected_to post_url(@post)
  #end

  #test "should destroy post" do
  #  assert_difference("Post.count", -1) do
  #    delete post_url(@post)
  #  end

    # Ensure the user is redirected to the index after deletion
  #  assert_redirected_to posts_url
  #end
end
