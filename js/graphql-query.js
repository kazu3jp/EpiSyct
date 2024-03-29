var query = `query {
    viewer {
        libraryEntries(states: WATCHING) {
            nodes {
				work{
                    id,
                        annictId,
                        seasonName,
                        seasonYear,
                        title,
                        officialSiteUrl,
                        media,
                        episodesCount,
                        noEpisodes,
                        image{
                        facebookOgImageUrl
                    },
                    episodes(orderBy: {
                        direction: ASC, field: SORT_NUMBER
                    }) {
						nodes{
                            numberText,
                                title,
                                viewerDidTrack,
                                id,
                                annictId
                        }
                    }
                }
                nextEpisode{
                    numberText,
                        title,
                        viewerDidTrack,
                        id,
                        annictId,
			    }
			    nextProgram{
                    startedAt,
                        channel{
                        annictId,
                            name,
			        }
                }
            }
        }
    }
}`