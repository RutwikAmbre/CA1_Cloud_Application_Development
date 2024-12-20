class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.all
    #render :index
    render json: @posts
  end

  # GET /posts/1 or /posts/1.json
  def show
    @post = Post.find_by(id: params[:id]) # Use find_by to avoid exception
    if @post
      respond_to do |format|
        format.html { render :show, status: :ok } # Render HTML view for show
        format.json { render json: @post } 
      end
    else
      redirect_to posts_path, alert: "Post not found. Please put a correct"
    end
  end
  

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
    
    respond_to do |format|
      if @post
        format.html { render :edit }
        format.json { render json: @post }
      else
        format.html { redirect_to posts_path }
        format.json { render json: { error: "Post not found" }, status: :not_found }
      end
    end
  end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        # On success:
        format.html { render :show, status: :created }
        format.json { render json: @post, status: :created}
      else
        # On failure:
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    @post = Post.find_by!(id: params[:id])
    
    if @post.update(post_params)
      respond_to do |format|
        format.html { render :show, status: :ok }
        format.json { render json: @post, status: :ok }
      end
    else
      respond_to do |format|
        #format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post = Post.find_by!(id: params[:id])  # Explicitly set @post

    if @post
      @post.destroy
      respond_to do |format|
        format.html { head :no_content }
        format.json { render json: { message: "Post was successfully destroyed" }, status: :ok }
      end
    else
      respond_to do |format|
        #format.html { redirect_to posts_url}
        format.json { render json: { error: "Post not found" }, status: :not_found }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find_by!(id: params[:id])
    if @post.nil?
      redirect_to posts_path
    end
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :content)
  end

end
