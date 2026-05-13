#!/bin/bash
set -e

echo "=== PetMatch Infrastructure Assessment ==="
echo ""

# Symlink so Pylance can statically resolve the pm_infra module
if [ ! -e "/workspace/infrastructure/pm_infra" ]; then
    ln -s /workspace/infrastructure/package /workspace/infrastructure/pm_infra
fi

# Create venvs for all stacks
for dir in network cache-service search; do
    if [ ! -d "/workspace/infrastructure/$dir/venv" ]; then
        echo "Creating venv for $dir..."
        cd /workspace/infrastructure/$dir
        python -m venv venv
        venv/bin/pip install -q --upgrade pip setuptools wheel
        venv/bin/pip install -q -r requirements.txt
        cd /workspace
    fi
done

# Verify the shared package is importable
cd /workspace/infrastructure/search
venv/bin/python -c "from pm_infra.components.elasticache import ElastiCache; print('pm_infra OK')"
cd /workspace

# Seed Pulumi stacks if needed
if ! pulumi stack ls --project network 2>/dev/null | grep -q "test.eu-west-1"; then
    echo "Seeding Pulumi stacks..."
    /workspace/.devcontainer/seed/seed_stacks.sh
fi

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
echo "Ready."
