# Regenerate tags & categories, then run dev server with incremental build.

cd "../.."
bundle exec jekyll serve -I --config _config.yml,_config.dev.yml
cd .\scripts\windows\
