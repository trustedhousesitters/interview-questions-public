FROM python:3.11-slim

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Pulumi CLI
RUN curl -fsSL https://get.pulumi.com | sh
ENV PATH="/root/.pulumi/bin:${PATH}"

# Working directory
WORKDIR /workspace
COPY . /workspace/

# Symlink so Pylance can statically resolve the pm_infra module (mapped from package/ in pyproject.toml)
RUN ln -s /workspace/infrastructure/package /workspace/infrastructure/pm_infra

# Install the shared package and create venvs for each stack
RUN pip install --no-cache-dir pulumi pulumi-aws pydantic

# Pre-install the Pulumi AWS provider plugin to avoid download on first preview
RUN AWS_VER=$(pip show pulumi-aws | awk '/^Version:/{print $2}') && \
    pulumi plugin install resource aws "$AWS_VER"

# Pre-create venvs for all stacks so candidates don't wait
RUN for dir in network cache-service search; do \
    cd /workspace/infrastructure/$dir && \
    python -m venv venv && \
    venv/bin/pip install --no-cache-dir --upgrade pip setuptools wheel && \
    venv/bin/pip install --no-cache-dir -r requirements.txt && \
    cd /workspace; \
    done

# Verify the shared package is importable
RUN cd /workspace/infrastructure/search && \
    venv/bin/python -c "from pm_infra.components.elasticache import ElastiCache; print('pm_infra OK')"

# Local Pulumi backend (no cloud account needed)
ENV PULUMI_BACKEND_URL="file://~/.pulumi-local"
ENV PULUMI_CONFIG_PASSPHRASE=""

# Seed local Pulumi backend with mock network stack + dummy AWS profiles
RUN .devcontainer/seed/seed_stacks.sh
