def sign_in(user)
    @user = user
    visit sign_in_url
    within '#sign-in' do
      fill_in 'Email', with: @user.email
      fill_in 'Password', with: @user.password
      click_on 'Sign in'
    end