# config.rb
require 'uglifier'

set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'
set :partials_dir, 'partial'
set :haml, { :ugly => true, :format => :html5 }
activate :minify_html
activate :livereload
activate :asset_hash
activate :cache_buster

configure :development do
  set :debug_assets, true
end

configure :build do
  activate :minify_javascript
  activate :minify_css
  activate :relative_assets
end

case ENV['TARGET'].to_s.downcase
  when 'production'
    activate :deploy do |deploy|
    deploy.build_before = true
    deploy.method   = :ftp
    deploy.host     = '200.63.97.53'
    deploy.path     = 'public_html/'
    deploy.user     = 'gorila'
    deploy.password = 'RdYisrZ'
    end
  else
    activate :deploy do |deploy|
      deploy.method = :git
      deploy.branch   = 'bb-middleman'
      deploy.commit_message = 'Commit - middleman branch'
    end
  end