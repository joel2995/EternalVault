module EternalKeepSafeVault::Auth {
    use std::crypto;
    use std::signer;
    use std::error;
    use std::string;

    struct User has key {
        address: address,
        name: string::String,
        hashed_pin: vector<u8>, // Hashed PIN stored as bytes
    }

    public entry fun register_user(
        account: &signer,
        name: string::String,
        pin: vector<u8>
    ) acquires User {
        let addr = signer::address_of(account);
        assert!(!exists<User>(addr), error::ALREADY_EXISTS);

        let hashed_pin = crypto::sha3_256(pin);

        move_to(account, User {
            address: addr,
            name,
            hashed_pin,
        });
    }

    public entry fun login_user(
        account: &signer,
        pin: vector<u8>
    ) acquires User {
        let addr = signer::address_of(account);
        assert!(exists<User>(addr), error::NOT_FOUND);

        let user = borrow_global<User>(addr);
        let hashed_pin = crypto::sha3_256(pin);
        assert!(user.hashed_pin == hashed_pin, error::INVALID_ARGUMENT);
    }
}
