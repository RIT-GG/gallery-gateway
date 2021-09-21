/**
 * 
 * @param {object} artifact 
 */
function generateArtifact (artifact_id, artifact_name, artifact_content) {
    const artifact_container = createElementWithAttrributes("div", { classes: ["artifact-container"] });

    const artifact_header_wrapper = createElementWithAttrributes("div", { classes: ["d-flex", "flex-column", "flex-md-row", "justify-content-between", "align-items-md-center", "p-3", "rounded", "bg-secondary"] });
    // Create the artifact header and append it to the header wrapper
    const artifact_header = createElementWithAttrributes("h3", { classes: ["mb-3", "mb-md-0", "text-white"] });
    artifact_header.innerText = artifact_name;
    artifact_header_wrapper.appendChild(artifact_header);

    // Create the view arrtifact button and append it to the header wrapper
    const artifact_button = createElementWithAttrributes("button", {
        classes: ["btn", "btn-primary", "mb-3", "mb-md-0"],
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": "#" + artifact_id,
        "aria-expanded": "false",
        "aria-controls": artifact_id,
        "aria-label": "View GG RIT's " + artifact_name
    });
    artifact_button.innerText = "View Artifact";
    artifact_header_wrapper.appendChild(artifact_button);

    // Append the header wrapper to the artifact element
    artifact_container.appendChild(artifact_header_wrapper);

    const artifact_content_collapse = createElementWithAttrributes("div", {classes: ["collapse", "p-3", "bg-light", "rounded-bottom"], id: artifact_id});
    let artifact_content_element;
    if( artifact_content.type === "embedded_page"){
        const artifact_iframe = createElementWithAttrributes("iframe", {src: artifact_content.content});
        artifact_content_element = createElementWithAttrributes("div", { classes: ["ratio"], style: "--bs-aspect-ratio: calc(8.5/11 * 100%);"});
        artifact_content_element.appendChild(artifact_iframe);
    }
    artifact_content_collapse.appendChild(artifact_content_element);
    artifact_container.appendChild(artifact_content_collapse);

    document.getElementById("artifacts").appendChild(artifact_container);
}