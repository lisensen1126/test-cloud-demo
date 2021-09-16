module.exports = {
    prefix: '[data-frontend-module-container="coding-frontend-test-cloud"]',
    transform: (prefix, selector, prefixedSelector) => {
        // FIXME： 过度的兼容方案，解决 qci 原有微前端容器命名冲突
        const shouldReversePrefixedSelector = [
            'html body',
            'html',
            'body',
            ':global html',
            ':global body',
        ];
        const shouldSkips = [
            /.cuk2/,
            // /html$/
        ];
        if (shouldReversePrefixedSelector.some(s => s === selector)) {
            return `${selector} ${prefix}`;
        }
        if (shouldSkips.some(sk => sk.test(selector))) {
            return selector;
        }
        if (selector.startsWith(':global .cuk')) {
            return `${prefix} ${selector}`;
        }
        return `${prefixedSelector}`;
    },
};