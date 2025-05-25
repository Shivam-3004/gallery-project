(function () {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function setActiveFilter(button) {
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
            btn.tabIndex = -1;
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        button.tabIndex = 0;
        button.focus();
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveFilter(button);
            const filter = button.dataset.filter;
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        button.addEventListener('keydown', (e) => {
            // Arrow key navigation among filters
            let index = [...filterButtons].indexOf(e.target);
            if (e.key === 'ArrowRight') {
                index = (index + 1) % filterButtons.length;
                filterButtons[index].focus();
            } else if (e.key === 'ArrowLeft') {
                index = (index - 1 + filterButtons.length) % filterButtons.length;
                filterButtons[index].focus();
            }
        });
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalImg = modal.querySelector('img');
    const modalCaption = document.getElementById('modalCaption');
    const modalCloseBtn = document.getElementById('modalClose');
    const modalPrevBtn = document.getElementById('modalPrev');
    const modalNextBtn = document.getElementById('modalNext');

    let currentIndex = -1;

    const visibleItems = () => {
        return [...galleryItems].filter(item => item.style.display !== 'none');
    }

    function openModal(index) {
        const items = visibleItems();
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        currentIndex = index;

        const item = items[currentIndex];
        const img = item.querySelector('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.textContent = item.querySelector('.caption').textContent;

        modal.classList.add('active');
        modal.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        openModal(currentIndex - 1);
    }

    function showNext() {
        openModal(currentIndex + 1);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (item.style.display !== 'none') {
                const items = visibleItems();
                let visibleIndex = items.indexOf(item);
                openModal(visibleIndex);
            }
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (item.style.display !== 'none') {
                    const items = visibleItems();
                    let visibleIndex = items.indexOf(item);
                    openModal(visibleIndex);
                }
            }
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalPrevBtn.addEventListener('click', showPrev);
    modalNextBtn.addEventListener('click', showNext);

    modal.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeModal();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                showPrev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                showNext();
                break;
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
})();
