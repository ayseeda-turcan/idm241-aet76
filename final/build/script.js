function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
}

document.querySelectorAll('.pin-card').forEach(card => {
    const shareBtn = card.querySelector('.share-button');
    const moreBtn = card.querySelector('.view-more-button');
    const shareMenu = card.querySelector('.share-options');
    const saveMenu = card.querySelector('.save-options');

    const pinMajor = card.querySelector('.pin-major-button');
    const boardsOverlay = card.querySelector('.boards-overlay');
    const boards = boardsOverlay ? boardsOverlay.querySelectorAll('.board') : [];
    const pinMinors = card.querySelectorAll('.pin-minor');
    const savedPopup = card.querySelector('.saved-popup');

    const overlayCenter = card.querySelector('.overlay-center');
    const overlayBottom = card.querySelector('.overlay-bottom');

    //          Share button            ---
    shareBtn?.addEventListener('click', e => {
        e.stopPropagation();
        const open = shareMenu.classList.contains('show');
        closeAllDropdowns();
        if (!open) shareMenu.classList.add('show');
    });

    //          Copy Link button            ---
    const copyLinkBtn = card.querySelector('.copyLinkButton');
    const linkInput = card.querySelector('#linkToCopy');

    copyLinkBtn?.addEventListener('click', e => {
        e.stopPropagation();
        const linkToCopy = linkInput?.value || card.querySelector('a').href;

        navigator.clipboard.writeText(linkToCopy).then(() => {
            const originalText = copyLinkBtn.textContent;
            copyLinkBtn.textContent = 'Link Copied!';
            copyLinkBtn.style.color = '#E60023';

            setTimeout(() => {
                copyLinkBtn.textContent = originalText;
                copyLinkBtn.style.color = '';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy link:', err);
            copyLinkBtn.textContent = 'Failed to copy';
            setTimeout(() => {
                copyLinkBtn.textContent = 'Copy Link';
            }, 1500);
        });
    });

    //          View More button            ---
    moreBtn?.addEventListener('click', e => {
        e.stopPropagation();
        const open = saveMenu.classList.contains('show');
        closeAllDropdowns();
        if (!open) saveMenu.classList.add('show');
    });

    //          Pin - Major toggles pin board overlay           ---
    pinMajor?.addEventListener('click', e => {
        e.stopPropagation();
        if (!boardsOverlay) return;

        const show = !boardsOverlay.classList.contains('show');
        boardsOverlay.classList.toggle('show', show);

        // HIDE overlayCenter and overlayBottom
        overlayCenter?.classList.toggle('hidden', show);
        overlayBottom?.classList.toggle('hidden', show);

        // Animate boards
        boards.forEach((board, index) => {
            board.classList.remove('animate-in');
            if (show) {
                setTimeout(() => board.classList.add('animate-in'), index * 100);
            }
        });
    });

    //          PIN MINOR           ---
    pinMinors.forEach(minorBtn => {
        const img = minorBtn.querySelector('img');
        const spinner = minorBtn.querySelector('.spinner');
    
        minorBtn.addEventListener('click', e => {
            e.stopPropagation();
        
            const img = minorBtn.querySelector('img');
            const spinner = minorBtn.querySelector('.spinner');
        
            minorBtn.classList.add('loading');
            img.style.opacity = '0';
            spinner.style.display = 'block';
        
            setTimeout(() => {
                const isPin = img.src.includes('final-pin.svg');
        
                img.src = isPin ? 'final-no-pin.svg' : 'final-pin.svg';
        
                // END LOADING AFTER SVG SWAP
                minorBtn.classList.remove('loading');
                spinner.style.display = 'none';
                img.style.opacity = '1';
        
                // --- KEEP THE OVERLAY VISIBLE FOR A MOMENT ---
                setTimeout(() => {
                    boardsOverlay.classList.remove('show');
        
                    // popup text
                    if (savedPopup) {
                        savedPopup.textContent = isPin
                            ? 'Saved to board'
                            : 'Removed from board';
        
                        savedPopup.classList.add('show');
        
                        setTimeout(() => savedPopup.classList.remove('show'), 2000);
                    }
                }, 750); // delay before overlay fades out
        
            }, 700); // delay before svg swap
        });
    });
    


    //          Mouse leave             ---
    card.addEventListener('mouseleave', () => {
        shareMenu?.classList.remove('show');
        saveMenu?.classList.remove('show');
        boardsOverlay?.classList.remove('show');
        boards.forEach(board => board.classList.remove('animate-in'));

        overlayCenter?.classList.remove('hidden');
        overlayBottom?.classList.remove('hidden');
    });
});

//              Click outside           ---
document.addEventListener('click', e => {
    if (!e.target.closest('.share-button') &&
        !e.target.closest('.view-more-button') &&
        !e.target.closest('.pin-major-button') &&
        !e.target.closest('.boards-overlay')) {
        closeAllDropdowns();
        document.querySelectorAll('.boards-overlay').forEach(overlay => {
            overlay.classList.remove('show');
            overlay.querySelectorAll('.board').forEach(board => board.classList.remove('animate-in'));
        });
    }
});