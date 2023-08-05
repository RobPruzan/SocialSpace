// may be better off creating decoraters for this
// not sure how easy that will be
// the idea would be everything has an id
// if a user is in a challenge, the user also has challenges
//  - many to many
// maybe we should just do it simpler (probably better for learnings anyways to do it based on intuit)
// so we would have:
// bootstrap: handles updating the redux store
// redux: holds the schema and allows components to subscribe to changes
// the sync should happen in blobs
// the bootstrap and sync should share logic
// u could just literally have getters everywhere

class IndexDB {
  constructor() {}
}
