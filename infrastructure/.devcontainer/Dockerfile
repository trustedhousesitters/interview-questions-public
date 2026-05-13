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

# Install the shared package and create venvs for each stack
RUN pip install --no-cache-dir pulumi pulumi-aws pydantic

# Pre-install the Pulumi AWS provider plugin to avoid download on first preview
RUN AWS_VER=$(pip show pulumi-aws | awk '/^Version:/{print $2}') && \
    pulumi plugin install resource aws "$AWS_VER"

# Local Pulumi backend (no cloud account needed)
ENV PULUMI_BACKEND_URL="file://~/.pulumi-local"
ENV PULUMI_CONFIG_PASSPHRASE=""
