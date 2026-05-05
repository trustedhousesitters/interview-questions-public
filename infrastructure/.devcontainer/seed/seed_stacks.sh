#!/bin/bash
set -e

# Use local backend (no Pulumi Cloud account needed)
export PULUMI_BACKEND_URL="file://~/.pulumi-local"
export PULUMI_CONFIG_PASSPHRASE=""

echo "Setting up local Pulumi backend..."
mkdir -p ~/.pulumi-local
pulumi login --local

# Create dummy AWS profiles so the provider initialises without real credentials.
# pulumi preview resolves the resource graph but never calls AWS APIs.
mkdir -p ~/.aws
cat > ~/.aws/credentials << 'CREDS'
[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[search-test-iac]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[cache-service-test-iac]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[network-prod-iac]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
CREDS

cat > ~/.aws/config << 'CONF'
[default]
region = eu-west-1

[profile search-test-iac]
region = eu-west-1

[profile cache-service-test-iac]
region = eu-west-1

[profile network-prod-iac]
region = eu-west-1
CONF

# Seed the network stack with mock outputs so StackReference works
echo "Seeding network stack with mock outputs..."
cd /workspace/infrastructure/network

pulumi stack init organization/network/test.eu-west-1 2>/dev/null || true

# Deploy a temporary program that exports mock values.
# This creates valid state (with correct integrity checksums) that other
# stacks can resolve via StackReference.
MOCK_DIR=$(mktemp -d)
cat > "$MOCK_DIR/Pulumi.yaml" << 'YAML'
name: network
runtime:
  name: python
YAML
cat > "$MOCK_DIR/__main__.py" << 'PY'
import json, pulumi
with open("/workspace/.devcontainer/seed/network_mock_outputs.json") as f:
    outputs = json.load(f)
for key, value in outputs.items():
    pulumi.export(key, value)
PY
(cd "$MOCK_DIR" && pulumi up --stack organization/network/test.eu-west-1 --yes --skip-preview)
rm -rf "$MOCK_DIR"

echo "Initializing search stack..."
cd /workspace/infrastructure/search
pulumi stack init organization/search/test.eu-west-1 2>/dev/null || true

echo "Initializing cache-service stack..."
cd /workspace/infrastructure/cache-service
pulumi stack init organization/cache-service/test.eu-west-1 2>/dev/null || true

echo ""
echo "Stacks ready. To preview a stack:"
echo "  cd infrastructure/cache-service"
echo "  source venv/bin/activate"
echo "  pulumi preview --stack organization/cache-service/test.eu-west-1"
echo ""
