require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    # @user = users(:one)
    # sign_in @user
    @post = Post.create(title: "Existing Title", content: "Existing content", slug: "existing-post")
  end

  test "should get index" do
    get posts_url
    assert_response :success
  end

  # test "should get new" do
  #   get '/posts/new'
  #   assert_response :success
  # end

  test "should create post" do
    # Provide valid attributes for a new post
    valid_attributes = { content: "New content", slug: "new-post", title: "New Title" }

    assert_difference("Post.count", 1) do
      post posts_url, params: { post: valid_attributes }
    end

    # Ensure the newly created post redirects to its show page
    assert_redirected_to post_url(Post.last)
  end

  test "should not create post with invalid attributes" do
    invalid_attributes = { content: nil, slug: "new-post", title: nil } # Example invalid attributes
    assert_no_difference("Post.count") do
      post posts_url, params: { post: invalid_attributes }
    end
    assert_response :unprocessable_entity # Check for 422 status
    assert_template :index # Check that it renders the index template again
  end

  test "should show post" do
    get post_url(@post)
    assert_response :success
    assert_template :show
  end

  test "should get edit" do
    get edit_post_url(@post)
    assert_response :success
    assert_template :edit
  end

  test "should update post" do
    new_attributes = { title: "Updated Title" }
    patch post_url(@post), params: { post: new_attributes }
    assert_redirected_to @post
    assert_equal "Post was successfully updated.", flash[:notice]
    @post.reload
    assert_equal "Updated Title", @post.title
  end

  test "should not update post with invalid attributes" do
    original_title = @post.title
    invalid_attributes = { title: nil }
    patch post_url(@post), params: { post: invalid_attributes }
    assert_response :unprocessable_entity
    assert_template :edit
    @post.reload
    assert_equal original_title, @post.title
  end  

  test "should destroy post" do
    assert_difference("Post.count", -1) do
      delete post_url(@post)
    end

    assert_redirected_to posts_url
    assert_equal "Post was successfully destroyed.", flash[:notice]
  end
end
