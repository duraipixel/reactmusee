import React from 'react'
import { PackageSupport } from '../components/Home/PackageSupport'
import AddAddress from '../components/Profile/AddAddress'
import ChangePassword from '../components/Profile/ChangePassword'
import EditPersonalDetailsModal from '../components/Profile/EditPersonalDetailsModal'
import ProfileContent from '../components/Profile/ProfileContent'

export const Profile = () => {
    return (
        <div>
            <ProfileContent />
            <EditPersonalDetailsModal />
            <ChangePassword />
            <AddAddress />
            <PackageSupport/>
        </div>
    )
}
