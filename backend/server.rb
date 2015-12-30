require 'sinatra'
require 'sinatra/json'
require 'sinatra/cross_origin'
require 'net/http'
require 'json'

configure do
  enable :cross_origin
end

set :bind, '0.0.0.0'

get '/data' do
  info = JSON.parse(Net::HTTP.get('cache.usabilla.com', '/example/apidemo.json'))

  new_info = []

  info['items'].each do |item|
    new_info << {
      id: item['id'],
      browser: item['computed_browser']['Browser'],
      browser_version: item['computed_browser']['Version'],
      geo_location: { latitude: item['geo']['lat'], longitude: item['geo']['lon'] },
      rating: item['rating'],
      labels: item['labels']
    }
  end

  json new_info
end
