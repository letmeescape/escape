// Indian Languages
const languages = {
    'hi': 'Hindi',
    'bn': 'Bengali',
    'te': 'Telugu',
    'mr': 'Marathi',
    'ta': 'Tamil',
    'ur': 'Urdu',
    'gu': 'Gujarati',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'pa': 'Punjabi',
    'or': 'Odia',
    'as': 'Assamese',
    'sd': 'Sindhi',
    'sa': 'Sanskrit'
};

// Initialize translation elements
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('languageSearch');
    const languageList = document.getElementById('languageList');
    const translateButton = document.getElementById('translateButton');
    const languageToggle = document.getElementById('languageToggle');
    const languagePanel = document.getElementById('languagePanel');
    
    // Toggle language panel
    languageToggle.addEventListener('click', function() {
        languagePanel.classList.toggle('hidden');
        languageToggle.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = languagePanel.contains(event.target) || languageToggle.contains(event.target);
        if (!isClickInside && !languagePanel.classList.contains('hidden')) {
            languagePanel.classList.add('hidden');
            languageToggle.classList.remove('active');
        }
    });
    
    // Populate language list
    for (let code in languages) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = languages[code];
        languageList.appendChild(option);
    }

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const options = languageList.options;

        for (let i = 0; i < options.length; i++) {
            const optionText = options[i].text.toLowerCase();
            const optionValue = options[i].value.toLowerCase();
            const shouldShow = optionText.includes(searchTerm) || optionValue.includes(searchTerm);
            options[i].style.display = shouldShow ? '' : 'none';
        }
    });

    // Translation functionality
    translateButton.addEventListener('click', function() {
        const selectedLang = languageList.value;
        if (!selectedLang) return;

        // Add Google Translate script if not already added
        if (!document.querySelector('script[src*="translate.google.com"]')) {
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);
        }

        // Initialize Google Translate
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: selectedLang,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        };

        // Trigger translation
        if (window.googleTranslateElementInit) {
            window.googleTranslateElementInit();
        }
    });
});
