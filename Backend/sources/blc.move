module blc::eter {
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::signer;
    use std::string;
    use std::vector;

    const E_NOT_FOUND: u64 = 1;
    const E_PERMISSION_DENIED: u64 = 2;
    const E_INVALID_OPERATION: u64 = 3;

    // Struct to store private group data
    struct PrivateGroup has key, store {
        capsule_id: u64,
        members: vector<address>,
        join_fee: u64,
    }

    // Struct to represent a capsule
    struct Capsule has key, store {
        id: u64,
        owner: address,
        metadata: string::String,
        is_private: bool,
        creation_fee: u64,
        public_view_count: u64,
        is_deleted: bool,
    }

    // Struct to maintain a counter for capsules
    struct CapsuleCounter has key, store {
        count: u64,
    }

    struct User has key, store {
        mail_id: string::String,
        pin: u64, // Changed pin from vector<u8> to u64
    }

    public entry fun register_user(
        account: &signer,
        _mail_id: string::String,  // Prefixed with underscore (unused variable)
        _pin: u64                  // Prefixed with underscore (unused variable)
    ) {
        move_to(account, User { mail_id: _mail_id, pin: _pin });
    }

    public entry fun login_user(
        account: &signer,
        pin: u64
    ) acquires User {
        let addr = signer::address_of(account); // Use directly here for borrow_global
        
        // Check if user exists
        let user = borrow_global<User>(addr);
        
        // Verify PIN
        assert!(user.pin == pin, E_INVALID_OPERATION);
        // Login logic (if needed)
    }

    // Initialize the capsule counter for an account
    public entry fun init_capsule_counter(account: &signer) {
        let addr = signer::address_of(account); // Use directly here for borrow_global_mut
        assert!(!exists<CapsuleCounter>(addr), E_INVALID_OPERATION);
        move_to(account, CapsuleCounter { count: 0 });
    }

    // Function to create a capsule
    public entry fun create_capsule(
        account: &signer,
        metadata: string::String,
        is_private: bool,
        fee: u64
    ) acquires CapsuleCounter {
        let owner = signer::address_of(account); // Use directly here for move_to
        assert!(fee > 0, E_INVALID_OPERATION);

        let counter_ref = borrow_global_mut<CapsuleCounter>(owner);
        let capsule_id = counter_ref.count + 1;
        counter_ref.count = capsule_id;

        move_to(account, Capsule {
            id: capsule_id,
            owner,
            metadata,
            is_private,
            creation_fee: fee,
            public_view_count: 0,
            is_deleted: false,
        });
    }

    // Function to edit capsule metadata
    public entry fun edit_capsule(
        account: &signer,
        capsule_id: u64,
        new_metadata: string::String
    ) acquires Capsule {
        let addr = signer::address_of(account); // Use directly here for borrow_global_mut
        let capsule = borrow_global_mut<Capsule>(addr);

        assert!(capsule.id == capsule_id, E_NOT_FOUND);
        assert!(capsule.owner == addr, E_PERMISSION_DENIED);
        assert!(!capsule.is_deleted, E_INVALID_OPERATION);

        capsule.metadata = new_metadata;
    }

    // Function to delete a capsule
    public entry fun delete_capsule(account: &signer, capsule_id: u64) acquires Capsule {
        let addr = signer::address_of(account); // Use directly here for borrow_global_mut
        let capsule = borrow_global_mut<Capsule>(addr);

        assert!(capsule.id == capsule_id, E_NOT_FOUND);
        assert!(capsule.owner == addr, E_PERMISSION_DENIED);
        assert!(!capsule.is_deleted, E_INVALID_OPERATION);

        capsule.is_deleted = true;
    }

    // View capsule publicly
    public entry fun view_capsule_public(
        account: &signer,
        capsule_id: u64
    ) acquires Capsule {
        let addr = signer::address_of(account); // Use directly here for borrow_global_mut

        // Check if the capsule exists
        assert!(exists<Capsule>(addr), E_NOT_FOUND);

        let capsule = borrow_global_mut<Capsule>(addr);

        // Ensure the capsule ID matches
        assert!(capsule.id == capsule_id, E_NOT_FOUND);

        // Ensure the capsule is not deleted
        assert!(!capsule.is_deleted, E_INVALID_OPERATION);

        // Increment public view count
        capsule.public_view_count = capsule.public_view_count + 1;

        // Reward logic
        if (capsule.public_view_count % 1000 == 0) {
            coin::transfer<AptosCoin>(
                account,
                capsule.owner,
                5
            );
        }
    }

    // View capsule privately
    public entry fun view_capsule_private(
        account: &signer,
        capsule_id: u64
    ) acquires Capsule, PrivateGroup {
        let addr = signer::address_of(account); // Use directly here for borrow_global

        let capsule = borrow_global<Capsule>(addr);

        assert!(capsule.id == capsule_id, E_NOT_FOUND);
        assert!(capsule.is_private, E_PERMISSION_DENIED);

        let group = borrow_global<PrivateGroup>(capsule.owner);
        assert!(vector::contains(&group.members, &addr), E_PERMISSION_DENIED);
    }

    // Join a private group
    public entry fun join_private_group(
        account: &signer,
        capsule_id: u64,
        join_fee: u64
    ) acquires PrivateGroup {
        let addr = signer::address_of(account); // Use directly here for borrow_global_mut
        let group = borrow_global_mut<PrivateGroup>(addr);

        assert!(group.capsule_id == capsule_id, E_NOT_FOUND);
        assert!(!vector::contains(&group.members, &addr), E_INVALID_OPERATION);
        assert!(join_fee >= group.join_fee, E_INVALID_OPERATION);

        vector::push_back(&mut group.members, addr);
    }
}