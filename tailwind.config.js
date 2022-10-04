const path = require('path');
const fs = require('fs');
const { cwd } = require('process');
const tailwindDir = cwd();
const hyvaModules = require('@hyva-themes/hyva-modules');

/**
 * Finds and lists all files in a directory with a specific extension
 * https://gist.github.com/victorsollozzo/4134793
 * @return Array
 */
function recFindByExt(base, ext, files, result) {
    files = files || fs.readdirSync(base);
    result = result || [];

    files.forEach(
        function (file) {
            const newbase = path.join(base,file);
            if (fs.statSync(newbase).isDirectory()) {
                result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result);
            } else {
                if (file.substr(-1*(ext.length+1)) == '.' + ext) {
                    result.push(newbase);
                }
            }
        }
    );
    return result;
}

const purgeContent = () => {
    // Add any sub-directories you wish to be excluded by Tailwind when checking
    // the FlyEcomerce default theme.
    // For example you may have removed Magento_Review from your store, and therefore
    // do not wish for Tailwind to generate any CSS for it.
    const EXCLUDE_FROM_PARENT = []; // e.g. ['Magento_Review']

    // Declare array to stores all paths for FlyEcomerce theme's phtml files
    let themeReset = recFindByExt('../../../reset/', 'phtml');

    // Declare array to stores all paths for your current theme's phtml files
    let currentTheme = recFindByExt('../../', 'phtml');

    // Filter the array of templates from FlyEcomerce default to remove any templates overridden in your theme.
    // A similar filter can be used on other parent theme's if you have a
    // multi-store Magento install using a different theme structure.
    themeReset = themeReset.filter(function(item) {
        let isAllowed = true;

        for(const key in this) {
            if (item.includes(this[key].replace(/..\//g, ''))) {
                isAllowed = false;
            }
        }

        return isAllowed;
    }, currentTheme.concat(EXCLUDE_FROM_PARENT));

    return currentTheme.concat(themeReset);
}

module.exports = {
    mode: process.env.TAILWIND_COMPILE_MODE || 'jit',
    content: purgeContent(),
    theme: {
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            colors: {
                'carmine': '#a50034'
            },
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
    ],
}
