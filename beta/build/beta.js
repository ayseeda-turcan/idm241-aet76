function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
}

document.querySelectorAll('.pin-card').forEach(card => {
    const shareBtn = card.querySelector('.share-button');
    const moreBtn = card.querySelector('.view-more-button');
    const shareMenu = card.querySelector('.share-options');
    const saveMenu = card.querySelector('.save-options');

    // Share button
    shareBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = shareMenu.classList.contains('show');
    
    closeAllDropdowns();
    if (!open) shareMenu.classList.add('show');
    });

    // View More button
    moreBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = saveMenu.classList.contains('show');

    closeAllDropdowns();
    if (!open) saveMenu.classList.add('show');
    });

    // Close menu when mouse leaves card
    card.addEventListener('mouseleave', () => {
    shareMenu.classList.remove('show');
    saveMenu.classList.remove('show');
    });
});

// Click outside close all
document.addEventListener('click', e => {
    if (!e.target.closest('.share-button', '.view-more-button')) closeAllDropdowns();
});