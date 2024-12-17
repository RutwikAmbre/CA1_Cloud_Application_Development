class PostsController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :set_post, only: %i[edit update destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.all
    render json: @posts
  end

  # GET /posts/1 or /posts/1.json
  def show
    respond_to do |format|
      if @post
        format.html { render :show } #Render HTML view
        format.json { render json: @post }
      else
        format.json { render json: { error: 'Post not found' }, status: :not_found }
      end
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
        format.html { render :edit } #Render HTML view
        format.json { render json: @post }
      else
        format.json { render json: { error: 'Post not found' }, status: :not_found }
      end
    end
  end
  end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: "Post was successfully created." }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: "Post was successfully updated." }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_path, status: :see_other, notice: "Post was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.friendly.find_by(id: params[:id])
      unless @post
        respond_to do |format|
          format.html { redirect_to posts_path, alert: "Post not found." }
          format.json { render json: { error: 'Post not found' }, status: :not_found }
        end
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :content, :slug)
    end
end
