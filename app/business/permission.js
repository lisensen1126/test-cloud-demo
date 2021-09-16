import router from './components/common/router/router';
import { TokenKey } from '@/common/js/constants';
import {
    checkoutTestManagerOrTestUser,
    enableModules,
    hasLicense,
    hasRolePermissions,
    hasRoles,
} from '@/common/js/utils';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
// const whiteList = ['/login']; // no redirect whitelist

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// eslint-disable-next-line no-unused-vars
function checkTestManagerOrTestUser(el, binding) {
    let v = checkoutTestManagerOrTestUser();

    if (!v) {
        el.parentNode && el.parentNode.removeChild(el);
    }
}

// eslint-disable-next-line no-unused-vars
function checkLicense(el, binding, type) {
    let v = hasLicense();

    if (!v) {
        el.parentNode && el.parentNode.removeChild(el);
    }
}

function checkRolePermission(el, binding, type) {
    const { value } = binding;
    if (value && value instanceof Array && value.length > 0) {
        const permissionRoles = value;
        let hasPermission = false;
        if (type === 'roles') {
            hasPermission = hasRoles(...permissionRoles);
        } else if (type === 'permission') {
            hasPermission = hasRolePermissions(...permissionRoles);
        }
        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
}

function checkModule(el, binding) {
    const { value } = binding;
    if (value && value instanceof Array && value.length > 0) {
        let v = enableModules(...value);
        if (!v) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
}

export const permission = {
    inserted(el, binding) {
        checkRolePermission(el, binding, 'permission');
    },
};

export const roles = {
    inserted(el, binding) {
        checkRolePermission(el, binding, 'roles');
    },
};

export const xpack = {
    inserted(el, binding) {
        checkLicense(el, binding);
    },
};

// test、manager权限
export const tester = {
    inserted(el, binding) {
        checkTestManagerOrTestUser(el, binding);
    },
};

export const modules = {
    inserted(el, binding) {
        checkModule(el, binding);
    },
};

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    // determine whether the user has logged in
    const user = JSON.parse(localStorage.getItem(TokenKey));

    if (user) {
        next();
    } else {
        /* has no token*/
        // const { href } = window.location;
        // window.location.href = `/signin?redirect=${encodeURIComponent(href)}`;
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
