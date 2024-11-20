// Define the dropdownArrow and isDropdownVisible variables
const dropdownArrow = document.querySelector('.dropdown-arrow');
let isDropdownVisible = false; // Track the dropdown visibility state

// Toggle dropdown menu visibility and rotate the arrow
document.getElementById('dropdown-btn').addEventListener('click', () => {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const doneButton = document.getElementById('done-btn');
    
    // Toggle the visibility of the dropdown menu
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';

    // Rotate the arrow based on the dropdown visibility
    dropdownArrow.style.transform = isDropdownVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    
    // Update the visibility of the "Done" button
    if (dropdownMenu.style.display === 'block') {
        doneButton.style.display = 'inline-block';
    } else {
        doneButton.style.display = 'none';
    }

    // Toggle the dropdown visibility state
    isDropdownVisible = !isDropdownVisible;
});

// Handle checkbox selection for tagging multiple people
const selectedPeople = new Set(['ophelia徐']); // Ophelia selected by default

document.querySelectorAll('#dropdown-menu input[name="person"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            selectedPeople.add(event.target.value);
        } else {
            selectedPeople.delete(event.target.value);
        }

        // Update the button text with the selected people count
        document.getElementById('dropdown-btn').textContent = `Selected (${selectedPeople.size}) People`;

        // Show "Done" button when there are selected people
        const checkedPeople = document.querySelectorAll('#dropdown-menu input[name="person"]:checked');
        if (checkedPeople.length > 0) {
            document.getElementById('done-btn').style.display = 'inline-block';
        } else {
            document.getElementById('done-btn').style.display = 'none';
        }
    });
});

// Handle "Done" button functionality
document.getElementById('done-btn').addEventListener('click', () => {
    // Hide the dropdown menu when "Done" is clicked
    document.getElementById('dropdown-menu').style.display = 'none';

    // Update the dropdown button with the selected people count
    document.getElementById('dropdown-btn').textContent = `Selected (${selectedPeople.size}) People`;

    // Hide the "Done" button after the selection is complete
    document.getElementById('done-btn').style.display = 'none';

    // Reset the arrow rotation
    dropdownArrow.style.transform = 'rotate(0deg)';
    isDropdownVisible = false; // Reset the visibility state
});

// Function to highlight empty required fields in red
function highlightEmptyFields(fields) {
    let isValid = true;

    fields.forEach(field => {
        const inputElement = document.getElementById(field);
        if (!inputElement.value.trim()) {
            inputElement.style.borderColor = 'red';
            isValid = false;
        } else {
            inputElement.style.borderColor = '';
        }
    });

    return isValid;
}

// Function to show error message
function showError(message) {
    const errorPopup = document.getElementById('error-message');
    errorPopup.textContent = message;
    errorPopup.style.display = 'block'; // Show the error popup

    // Hide the popup after 3 seconds
    setTimeout(() => {
        errorPopup.style.display = 'none';
    }, 4000);
}


// Allow 'total' field to accept digits, commas, and a single decimal point
document.getElementById('total').addEventListener('input', function (event) {
    let value = event.target.value;

    // Keep only valid characters: digits, commas, and a single decimal point
    const numericPart = value.replace(/[^0-9,.]/g, ''); // Allow only digits, commas, and period
    const parts = numericPart.split('.');

    if (parts.length > 2) {
        // If more than one decimal point exists, remove extra ones
        value = parts[0] + '.' + parts.slice(1).join('');
    } else {
        value = numericPart;
    }

    // Update the input field with the corrected value
    event.target.value = value;
});

// Helper function to format a number with commas, preserving user-provided decimals
function formatNumberWithCommasAndPreserveDecimals(value) {
    if (!value) return '';

    // Remove commas to parse the number correctly
    let numericValue = value.replace(/,/g, '');

    // Check if the input contains decimals
    if (numericValue.includes('.')) {
        let [integerPart, decimalPart] = numericValue.split('.');
        integerPart = parseInt(integerPart, 10).toLocaleString(); // Format the integer part with commas
        return `${integerPart}.${decimalPart}`; // Preserve the user's decimal part
    } else {
        // No decimals, format with commas only
        return parseInt(numericValue, 10).toLocaleString();
    }
}

// Handle the Sales Personnel Dropdown visibility and rotate the arrow
document.getElementById('sales-dropdown-btn')?.addEventListener('click', function () {
    const salesMenu = document.getElementById('sales-dropdown-menu');
    const salesDropdownBtn = document.getElementById('sales-dropdown-btn');
    const salesArrow = salesDropdownBtn ? salesDropdownBtn.querySelector('.sales-dropdown-arrow') : null; // Get the sales dropdown arrow
    const isVisible = salesMenu && salesMenu.style.display === 'block';

    // Toggle the dropdown menu visibility if elements are found
    if (salesMenu) {
        salesMenu.style.display = isVisible ? 'none' : 'block';
    }

    // Rotate the arrow when the dropdown is shown or hidden, if the arrow exists
    if (salesArrow) {
        if (isVisible) {
            salesArrow.style.transform = 'rotate(0deg)';
        } else {
            salesArrow.style.transform = 'rotate(180deg)';
        }
    }
});

// Handle "Done" button click for sales personnel
document.getElementById('done-sales-btn')?.addEventListener('click', function () {
    const salesMenu = document.getElementById('sales-dropdown-menu');
    const selectedSales = document.querySelector('input[name="sales"]:checked'); // Get the selected checkbox


    // Close the dropdown after selection, if the menu exists
    if (salesMenu) {
        salesMenu.style.display = 'none'; // Hide the dropdown when Done is clicked
    }

    // Reset the arrow rotation, if the dropdown button and arrow exist
    const salesArrow = document.getElementById('sales-dropdown-btn')?.querySelector('.sales-dropdown-arrow');
    if (salesArrow) {
        salesArrow.style.transform = 'rotate(0deg)';
    }
});

// Ensure only one checkbox is selected at a time for sales
document.querySelectorAll('input[name="sales"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        // Uncheck all other checkboxes if one is selected
        if (checkbox.checked) {
            document.querySelectorAll('input[name="sales"]').forEach((otherCheckbox) => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false; // Uncheck all other checkboxes
                }
            });
        }

        // Update the dropdown button text based on the selected salesperson
        const selectedSales = document.querySelector('input[name="sales"]:checked');
        const salesButton = document.getElementById('sales-dropdown-btn');
        if (salesButton) {
            if (selectedSales) {
                salesButton.textContent = `Selected Sales: ${selectedSales.value}`; // Show selected salesperson
            } else {
                salesButton.textContent = 'Select Sales Personnel'; // Default text if no sales is selected
            }
        }
    });
});





// Handle Generate button click
document.getElementById('generate-btn').addEventListener('click', () => {
    const requiredFields = ['job', 'client', 'app', 'desc', 'total', 'currency-search']; // List of required fields

    // Check if all required fields are filled
    if (!highlightEmptyFields(requiredFields)) {
        showError('Please fill in all required fields before generating the message.');
        return;
    }

    const bl = document.getElementById('bl').value.trim();
    const job = document.getElementById('job').value.trim();
    const client = document.getElementById('client').value.trim();
    const app = document.getElementById('app').value.trim();
    const desc = document.getElementById('desc').value.trim();
    const invoice = document.getElementById('invoice').value.trim();
    let total = document.getElementById('total').value.trim();
    const currency = document.getElementById('currency').value.trim();

    // Get selected sales personnel
    const selectedSales = document.querySelector('input[name="sales"]:checked');
    const salesName = selectedSales ? selectedSales.value : null; // If no sales personnel selected, it's null

    let message = '';

    // Helper function to format list inputs (handles both single and multiple inputs)
    function formatField(inputValue, fieldName, addSpace = false) {
        const trimmedValues = inputValue.split(',').map((item) => item.trim());

        if (trimmedValues.length > 1) {
            return `${fieldName}:\n${trimmedValues.join('\n')}\n${addSpace ? '\n' : ''}`;
        } else if (trimmedValues.length === 1 && trimmedValues[0] !== '') {
            return `${fieldName}: ${trimmedValues[0]}\n`;
        } else {
            return `${fieldName}: \n`;
        }
    }

    // Conditionally add fields to the message (only if they are filled)
    if (bl) message += formatField(bl, '𝐁𝐋', true);
    if (job) message += formatField(job, '𝐉𝐨𝐛 𝐍𝐨', true);
    if (client) message += formatField(client, '𝐂𝐋𝐈𝐄𝐍𝐓', true);
    if (app) message += `𝐀𝐏𝐏𝐋𝐈𝐂𝐀𝐓𝐈𝐎𝐍 𝐍𝐎: ${app}\n`;
    if (desc) message += `𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍: ${desc}\n`;
    if (invoice) message += `𝐈𝐧𝐯𝐨𝐢𝐜𝐞𝐝 𝐁𝐲: ${invoice}\n`;

    // Format the total field with commas and preserve decimals if provided
    if (total) {
        total = formatNumberWithCommasAndPreserveDecimals(total); // Format total
        message += `𝐓𝐎𝐓𝐀𝐋: ${currency} ${total}\n\n`; // Add one line break after the total
    }

    // Add sales personnel (on the next line after the total)
    if (salesName) {
        message += `Sales Personnel: ${salesName}\n`; // Position sales below the total
    }

    // Add tagged people (if any) right below the sales personnel
    const peopleTags = Array.from(selectedPeople)
        .map((person) => `@${person}`)
        .join(' ');
    message += `${peopleTags} kindly help approve the attached application, Thanks..\n`; // No extra line before tags

    // Display the generated message in the result area
    document.getElementById('result').textContent = message;
});




// Clear fields function
document.getElementById('clear-btn').addEventListener('click', () => {
    // Clear all input fields
    document.getElementById('bl').value = '';
    document.getElementById('job').value = '';
    document.getElementById('client').value = '';
    document.getElementById('app').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('invoice').value = '';
    document.getElementById('total').value = '';
    document.getElementById('currency').value = 'KES';

    // Reset dropdown selections
    selectedPeople.clear();
    selectedPeople.add('ophelia徐'); // Set default to Ophelia
    document.querySelectorAll('#dropdown-menu input[name="person"]').forEach(checkbox => checkbox.checked = checkbox.value === 'ophelia徐');
    document.getElementById('dropdown-btn').textContent = 'Selected (1) People';

    // Clear the generated message
    document.getElementById('result').textContent = '';

    // Clear Sales Personnel Selection
    const salesButton = document.getElementById('sales-dropdown-btn');
    if (salesButton) {
        // Reset sales dropdown button text to default
        salesButton.textContent = 'Select Sales Personnel'; 
        
        // Uncheck any selected sales personnel checkboxes
        document.querySelectorAll('input[name="sales"]').forEach((checkbox) => {
            checkbox.checked = false;
        });
        
        // Reset the sales dropdown arrow rotation
        const salesArrow = salesButton.querySelector('.sales-dropdown-arrow');
        if (salesArrow) {
            salesArrow.style.transform = 'rotate(0deg)';
        }
    }
});


document.getElementById('save-btn').addEventListener('click', () => {
    const message = document.getElementById('result').textContent;
    if (!message) {
        // Show the error notification for "No message to save"
        const saveErrorNotification = document.getElementById('save-error-notification');
        saveErrorNotification.style.display = 'flex';
        saveErrorNotification.style.opacity = '1';

        // Hide the error notification after 3 seconds
        setTimeout(() => {
            saveErrorNotification.style.opacity = '0';
            setTimeout(() => {
                saveErrorNotification.style.display = 'none';
            }, 300); // Wait for the transition to complete
        }, 3000);

        return; // Exit the function to prevent further execution
    }

    // Save the message to a file
    const blob = new Blob([message], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GeneratedMessage.txt';
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object
});


// Copy to clipboard function
document.getElementById('copy-btn').addEventListener('click', () => {
    const message = document.getElementById('result').textContent;
    if (!message) {
        // Show the error notification
        const errorNotification = document.getElementById('error-notification');
        errorNotification.style.display = 'flex';
        errorNotification.style.opacity = '1';

        // Hide the error notification after 3 seconds
        setTimeout(() => {
            errorNotification.style.opacity = '0';
            setTimeout(() => {
                errorNotification.style.display = 'none';
            }, 300); // Wait for transition to complete
        }, 3000);

        return;
    }

    navigator.clipboard.writeText(message).then(() => {
        // Show the success notification
        const notification = document.getElementById('notification');
        notification.style.display = 'flex';
        notification.style.opacity = '1';

        // Hide the success notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300); // Wait for the transition to complete
        }, 3000);
    }).catch(err => {
        alert('Failed to copy message.');
        console.error('Could not copy text:', err);
    });
});

// Show the dropdown list when the user starts typing in the search field
document.getElementById('currency-search').addEventListener('focus', () => {
    document.getElementById('currency-dropdown').classList.add('open');
});

// Hide the dropdown list when the user clicks outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('currency-dropdown');
    const searchInput = document.getElementById('currency-search');

    if (!dropdown.contains(e.target) && e.target !== searchInput) {
        dropdown.classList.remove('open');
    }
});

// Filter the currencies based on the search input
document.getElementById('currency-search').addEventListener('input', () => {
    const searchValue = document.getElementById('currency-search').value.toLowerCase();
    const currencyOptions = document.querySelectorAll('.currency-option');

    currencyOptions.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        if (optionText.includes(searchValue)) {
            option.style.display = ''; // Show matching options
        } else {
            option.style.display = 'none'; // Hide non-matching options
        }
    });
});

// Set the selected currency when an option is clicked
document.querySelectorAll('.currency-option').forEach(option => {
    option.addEventListener('click', (event) => {
        // Set the selected currency in the search field
        document.getElementById('currency-search').value = event.target.textContent.trim();

        // Set the hidden input field value to the selected currency value
        document.getElementById('currency').value = event.target.getAttribute('data-value');

        // Close the dropdown after selection
        document.getElementById('currency-dropdown').classList.remove('open');
    });
});


// Function to update the datalist with saved values
function updateDatalist(fieldId, savedValues) {
    const datalist = document.getElementById(fieldId);
    datalist.innerHTML = ''; // Clear the current suggestions

    savedValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        datalist.appendChild(option);
    });
}

// Save the value to localStorage and update datalist when the input field loses focus
function saveInputValue(inputId, storageKey, datalistId) {
    const inputElement = document.getElementById(inputId);
    let savedValues = JSON.parse(localStorage.getItem(storageKey)) || [];

    inputElement.addEventListener('blur', function () {
        let value = inputElement.value.trim();

        // Save the value if it's not already in the saved list
        if (value && !savedValues.includes(value)) {
            savedValues.push(value);
            localStorage.setItem(storageKey, JSON.stringify(savedValues));
        }

        // Update the datalist with saved values
        updateDatalist(datalistId, savedValues);
    });

    // Update the datalist with saved values on page load
    window.addEventListener('load', () => {
        savedValues = JSON.parse(localStorage.getItem(storageKey)) || [];
        updateDatalist(datalistId, savedValues);
    });
}

// Initialize memory functionality for the fields
saveInputValue('bl', 'blValues', 'bl-suggestions');
saveInputValue('job', 'jobValues', 'job-suggestions');
saveInputValue('client', 'clientValues', 'client-suggestions');
saveInputValue('invoice', 'invoiceValues', 'invoice-suggestions');



