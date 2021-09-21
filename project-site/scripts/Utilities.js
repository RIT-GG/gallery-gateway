function isOneOrMoreArray( array ) {
    return Array.isArray(array) && array.length > 0;
}

function createElementWithAttrributes(element_type, attributes) {
    // Create the element
    const element = document.createElement(element_type);
    // Handle the classes array
    if (isOneOrMoreArray(attributes.classes)) {
        element.classList.add(...attributes.classes);
        delete attributes.classes;
    }

    const attribute_keys = Object.keys(attributes);
    for (let i = 0; i < attribute_keys.length; i++) {
        const attribute_name = attribute_keys[i];
        const attribute_value = attributes[attribute_name];
        element.setAttribute(attribute_name, attribute_value);
    }

    return element;
}