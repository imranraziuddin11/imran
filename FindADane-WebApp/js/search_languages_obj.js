var search_languages_obj = function() {

    var languages = [
        "-- Select an option --",
        "Mandarin",
        "Spanish",
        "English",
        "Hindi/Urdu",
        "Arabic",
        "Bengali",
        "Portuguese",
        "Russian",
        "Japanese",
        "German",
        "Javanese",
        "Punjabi",
        "Wu",
        "French",
        "Telugu",
        "Vietnamese",
        "Marathi",
        "Korean",
        "Tamil",
        "Italian",
        "Turkish",
        "Cantonese/Yue"
    ];

    var load = function() {
        var select_option = document.getElementById("search_language_options");
        select_option.innerHTML = "";
        for (var i = 0; i < languages.length; i++) {
            var option = document.createElement("div");
            option.textContent = languages[i];
            option.setAttribute("class", "global_dropdown_option");
            option.dataset.name = languages[i];
            option.onclick = function() {
                language_selected(this);
            }
            select_option.appendChild(option);
        }
    };

    var language_selected = function(elem) {
        var selected_name = elem.dataset.name;
        document.getElementById("search_language_value").textContent = selected_name;
        var language_name = selected_name.split(" ").join("_");
        language_name = language_name.split("'").join("_");
        language_name = language_name.split("/").join("_");
        search_processing_obj.update_language(language_name.toUpperCase());
    };

    return {
        load: load
    }

}();