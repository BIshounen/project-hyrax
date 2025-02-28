let site_id;

function devicesFunc(vars) {
    return vars
}

window.vmsApiInit = async function () {
    const token = await window.vms.auth.sessionToken();
    initResourcesUI(body, token);
}

function add_device_thumbnail(device_id, token, element) {

    const address = `https://${site_id}.relay.vmsproxy.com/rest/v3/devices/${device_id}/image?size=200x0`;
    response = fetch(address,
        {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "image/jpeg"
            }
        }
    ).then(function (response) {
        if (response.ok) {
            return response.blob().then(function (blob) {
                var objectURL = (window.URL ? URL : webkitURL).createObjectURL(blob);
                console.log(objectURL)
                element.src = objectURL
            });
        }
    });

}

function create_icon(parent_element, icon_path){
    icon = document.createElement('img')
    icon.className = 'icon'
    icon.src = icon_path
    parent_element.appendChild(icon)
}

function create_button(parent_element, onclick_function, icon_path){
    button = document.createElement('div')
    button.onclick = onclick_function
    button.className = 'button idle'

    icon = document.createElement('img')
    icon.className = 'button-icon'
    icon.src = icon_path
    button.appendChild(icon)

    button.onmouseover = (e) => {
        button.className = 'button hovered';
        if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
            console.log('im hovered')
    }
    button.onmouseleave = (e) => {
        button.className = 'button idle';
        if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
    }

    parent_element.appendChild(button)
}


async function create_card(container, device_name, device_id, token) {
    const card = document.createElement('div');
    if(device_id in devices){
        card.className = 'device-card enabled';
        console.log(devices)
        card.onclick = () => location.href = "/rerun?port=" + devices[device_id];
        icon_path = '/static/icons/has_data.svg'
    } else {
        card.className = 'device-card disabled'
        console.log('no device')
        icon_path = '/static/icons/no_data.svg'
    }
    card.setAttribute("id", device_id);

    const card_title = document.createElement('div');
    card_title.className = 'device-card-header';
    card_title.innerText = device_name;

    const card_image_container = document.createElement('div');
    card_image_container.className = 'device-card-image-container';

    const card_image = document.createElement('img');
    card_image.className = 'device-card-image'
    add_device_thumbnail(device_id, token, card_image)
    card_image_container.appendChild(card_image)

    const card_footer = document.createElement('div');
    card_footer.className = 'device-card-footer';

    create_icon(card_footer, icon_path)

    const buttons_container = document.createElement('div');
    buttons_container.className = 'device-card-footer-buttons-container';
    const on_click_function = (e) => {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        window.vms.tab.addItem(device_id, {});
    };
    create_button(
        buttons_container,
        on_click_function,
        '/static/icons/camera_icon.svg'
    )
    card_footer.appendChild(buttons_container);


    card.appendChild(card_title);
    card.appendChild(card_image_container);
    card.appendChild(card_footer);

    container.appendChild(card);
}

function remove_card(container, device_id) {
    card = document.getElementById(device_id);
    card.remove()
}


async function initResourcesUI(container, token) {
    site_id = await window.vms.auth.cloudSystemId();

    existing_cameras = []

    const resourceAdded =
        resource => {
            if (resource.type === 'camera' && !existing_cameras.includes(resource.id)) {
                create_card(container, resource.name, resource.id, token);
                existing_cameras.push(resource.id)
            }
        }

    vms.resources.added.connect(resource => resourceAdded(resource));
    vms.resources.removed.connect(
        resourceId => {
            remove_card(resourceId);
        })

    const resources = await vms.resources.resources();
    resources.forEach(resourceAdded);
}
