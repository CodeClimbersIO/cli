// custom-eslint-plugin.js
module.exports = {
  rules: {
    'use-code-climbers-button': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Enforce using CodeClimbersButton for proper event tracking',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
      },
      create(context) {
        return {
          Identifier(node) {
            if (
              node.name === 'button' ||
              node.name === 'Button' ||
              node.name === 'IconButton'
            ) {
              context.report({
                node,
                message:
                  'Please use the CodeClimbersButton or CodeClimbersIconButton so that events are properly tracked',
              })
            }
          },
          JSXIdentifier(node) {
            if (
              node.name === 'button' ||
              node.name === 'Button' ||
              node.name === 'IconButton'
            ) {
              context.report({
                node,
                message:
                  'Please use the CodeClimbersButton or CodeClimbersIconButton so that events are properly tracked',
              })
            }
          },
        }
      },
    },
  },
}
