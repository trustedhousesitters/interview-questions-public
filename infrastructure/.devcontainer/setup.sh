#!/bin/bash
set -e

echo "=== PetMatch Infrastructure Assessment ==="
echo ""
echo "Key locations:"
echo "  ElastiCache component:  infrastructure/package/components/elasticache/elasticache.py"
echo "  Cache service stack:    infrastructure/cache-service/__main__.py"
echo "  Your exercise:          infrastructure/search/__main__.py"
echo ""
echo "To validate your code:"
echo "  cd infrastructure/search"
echo "  source venv/bin/activate"
echo "  pulumi preview --stack organization/search/test.eu-west-1"
echo ""

# Ensure venvs exist
for dir in network cache-service search; do
    if [ ! -d "/workspace/infrastructure/$dir/venv" ]; then
        echo "Creating venv for $dir..."
        cd /workspace/infrastructure/$dir
        python -m venv venv
        venv/bin/pip install -q -r requirements.txt
        cd /workspace
    fi
done

# Re-seed stacks if needed (e.g. if container was rebuilt without image cache)
if ! pulumi stack ls --project network 2>/dev/null | grep -q "test.eu-west-1"; then
    echo "Re-seeding Pulumi stacks..."
    /workspace/.devcontainer/seed/seed_stacks.sh
fi

echo "Ready."
