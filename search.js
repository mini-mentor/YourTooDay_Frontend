function searchDiaryCovers() {
    // 검색어 가져오기
    const searchKeyword = $('#searchInput').val();

    // URL 디코딩
    const encodedKeyword = encodeURIComponent(searchKeyword);

    // 서버로 검색 요청
    $.ajax({
        url: `http://localhost:8080/api/diary-covers/search?keyword=${encodedKeyword}`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('검색 결과:', data);
            // 검색 결과를 화면에 표시
            displaySearchResults(data);
        },
        error: function (error) {
            console.error('검색 중 오류 발생:', error);
        }
    });
}

function displaySearchResults(results) {
    const diaryListContainer = $('#diaryList');
    diaryListContainer.empty(); // 기존 목록 비우기

    if (results.length === 0) {
        diaryListContainer.append('<p>검색 결과가 없습니다.</p>');
        return;
    }

    // 검색 결과를 목록에 추가
    results.forEach(diaryCover => {
        const listItem = `
            <div class="list" onclick="goToInnerDiary(${diaryCover.diaryCoverNo})">
                <img src="${diaryCover.diaryCoverImage}">
                <div class="list-text">
                    ${diaryCover.diaryCoverName}<br>
                </div>
            </div>
            <hr>
        `;
        diaryListContainer.append(listItem);
    });
}

function goToInnerDiary(diaryCoverNo) {
    window.location.href = `inner-diary.html?diaryCoverNo=${diaryCoverNo}`;
}

