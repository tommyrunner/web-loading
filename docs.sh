# structure
vuepress build docs

# Navigate to the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m '更新文档'

# Push to the gh-page branch of your warehouse
# Replace<USERNAME>/<REPO>with your information
git push -f git@github.com:tommyrunner/web-loading.git master:gh-pages

# 返回项目根目录
cd ..

# 删除 docs/.vuepress/dist 目录
rm -rf docs/.vuepress/dist