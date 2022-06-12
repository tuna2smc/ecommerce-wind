const path = require('path');
const fs = require('fs');

/**
 * Finds and lists all files in a directory with a specific extension
 * https://gist.github.com/victorsollozzo/4134793
 * @return Array
 */
function recFindByExt(base,ext, files,result) {
    let files = files || fs.readdirSync(base);
    let result = result || [];

    files.forEach(
        function (file) {
            const newbase = path.join(base,file);
            if (fs.statSync(newbase).isDirectory()) {
                result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
            } else {
                if (file.substr(-1*(ext.length+1)) == '.' + ext) {
                    result.push(newbase)
                }
            }
        }
    );
    return result;
}

const purgeContent = () => {
    // Add any sub-directories you wish to be excluded by Tailwind when checking
    // the hyva-default theme.
    // For example you may have removed Magento_Review from your store, and therefore
    // do not wish for Tailwind to generate any CSS for it.
    const EXCLUDE_FROM_PARENT = []; // e.g. ['Magento_Review']

    // Declare array to stores all paths for hyvaDefault theme's phtml files
    let hyvaDefault = recFindByExt('../../../../../../../vendor/hyva-themes/magento2-default-theme/', 'phtml');

    // Declare array to stores all paths for your current theme's phtml files
    let currentTheme = recFindByExt('../../','phtml');

    // Filter the array of templates from hyva-default to remove any templates overridden in your theme.
    // A similar filter can be used on other parent theme's if you have a
    // multi-store Magento install using a different theme structure.
    currentTheme = currentTheme.filter(function(item) {
        let isAllowed = true;

        for(const key in this) {
            if (item.includes(this[key].replace(/..//g, ''))) {
                isAllowed = false;
            }
        }

        return isAllowed;
    }, currentTheme.concat(EXCLUDE_FROM_PARENT));

    return currentTheme.concat(currentTheme);
}

module.exports = {
    content: purgeContent,
    theme: {
        colors: {
            'blue': '#1fb6ff',
            'purple': '#7e5bef',
            'pink': '#ff49db',
            'orange': '#ff7849',
            'green': '#13ce66',
            'yellow': '#ffc82c',
            'gray-dark': '#273444',
            'gray': '#8492a6',
            'gray-light': '#d3dce6',
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
}
