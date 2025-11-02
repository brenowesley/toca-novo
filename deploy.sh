#!/bin/bash

# --- Configuração ---
# Verifica se o diretório Git existe
if [ ! -d ".git" ]; then
    echo "❌ Erro: Este diretório não é um repositório Git. Inicialize com 'git init' primeiro."
    exit 1
fi

# Variável para a mensagem de commit (padrão se não for fornecida)
COMMIT_MSG="Atualização automática - $(date +'%Y-%m-%d %H:%M:%S')"

# Verifica se o usuário forneceu uma mensagem de commit
if [ ! -z "$1" ]; then
    COMMIT_MSG="$1"
fi

# --- Processo Git ---

echo "⚙️ Adicionando todas as mudanças (git add .)..."
git add .

echo "📝 Comitando com a mensagem: \"$COMMIT_MSG\""
git commit -m "$COMMIT_MSG"

# Tenta descobrir o branch atual (pode ser 'main' ou 'master')
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
if [ -z "$CURRENT_BRANCH" ]; then
    CURRENT_BRANCH="main"
fi

echo "📤 Enviando mudanças para o branch remoto: $CURRENT_BRANCH..."

# Tenta fazer o push
if git push origin "$CURRENT_BRANCH"; then
    echo "✅ Sucesso! Seu projeto foi atualizado no GitHub."
else
    echo "❌ Erro ao enviar. Verifique sua conexão ou se há conflitos."
fi

# Fim do script