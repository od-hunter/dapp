'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { userService, UserProfile } from '@/lib/userService'
import { useWallet } from '@/context/WalletContext'

export default function Leaderboard() {
  const { walletAddress } = useWallet()
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([])
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const leaderboardData = [
    {
      rank: 1,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
    },
    {
      rank: 2,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
    },
    {
      rank: 3,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
    },
    {
      rank: 4,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
    },
    {
      rank: 5,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
    },
    {
      rank: 6,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
    },
    {
      rank: 7,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
      highlighted: true,
    },
    {
      rank: 8,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
    },
    {
      rank: 9,
      user: '0XC05D900F7BE1570A02E7F760C674...',
      impact: 20,
      earned: 30,
      sold: 300,
      staked: '2,070.5',
    },
  ]

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Extract wallet addresses from leaderboard data
        const walletAddresses = leaderboardData.map((item) => item.user)

        // Fetch profiles for all users in leaderboard
        const profiles =
          await userService.getLeaderboardProfiles(walletAddresses)
        console.log('profiles', profiles)
        setUserProfiles(profiles)

        // Fetch current user profile if wallet is connected
        if (walletAddress) {
          const currentProfile = await userService.getUserProfile(walletAddress)
          setCurrentUserProfile(currentProfile)
        }
      } catch (error) {
        console.error('Error fetching profiles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [walletAddress])

  const getUserProfile = (userAddress: string) => {
    return userProfiles.find(
      (profile) => profile.wallet_address === userAddress
    )
  }

  const getAvatarUrl = (userAddress: string) => {
    const profile = getUserProfile(userAddress)
    if (profile) {
      return userService.getAvatarUrl(profile)
    }
    return null
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 p-6'>
        <div className='mx-auto flex max-w-7xl items-center justify-center'>
          <div className='text-lg'>Loading leaderboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#F8F4E4] p-4'>
      <div className='mx-auto flex w-full max-w-screen-2xl gap-3 rounded-2xl bg-white p-3'>
        {/* Profile Section */}
        <div className='w-90 max-w-[404px]'>
          <Card className='h-full min-h-full rounded-[16px] border-[#101828] bg-[#272727] p-0 text-white'>
            <CardContent className='p-6'>
              <h2 className='mb-6 text-center text-2xl font-bold'>
                My Profile
              </h2>

              {/* Profile Avatar */}
              <div className='mb-6'>
                <div className='mx-auto h-[120px] w-[120px] rounded-[15px] border-2 border-[#101828] p-2'>
                  <Image
                    src={
                      currentUserProfile
                        ? userService.getAvatarUrl(currentUserProfile)!
                        : '/avatar.png'
                    }
                    alt='Profile Avatar'
                    width={96}
                    height={96}
                    className='h-full w-full overflow-hidden rounded-[10px] border border-[#101828] object-cover'
                  />
                </div>
              </div>

              {/* Username */}
              <div className='mb-4 xl:mb-12'>
                <div className='flex items-center justify-center gap-2'>
                  <span className='truncate font-mono text-lg'>
                    {walletAddress || '0xdafea492d9c673...'}
                  </span>
                  <Image
                    src='/cuida_copy-outline.png'
                    alt='Copy'
                    width={20}
                    height={20}
                    className='h-5 w-5'
                  />
                </div>
              </div>

              {/* Portfolio Overview */}
              <div className='w-full'>
                <h3 className='mb-6 text-sm'>Portfolio overview</h3>
                <div className='flex flex-col gap-4 rounded-md bg-white p-3 text-black'>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold text-black'>
                      LEADERBOARD POSITION
                    </span>
                    <span className='text-[#8C8C8C]'>7</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>IP COLLECTION</span>
                    <span className='text-[#8C8C8C]'>32</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>IP SOLD</span>
                    <span className='text-[#8C8C8C]'>19</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span> TOTAL QUADRATIC FUNDING</span>
                    <span className='text-[#8C8C8C]'>$300</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>REFERRALS</span>
                    <span className='text-[#8C8C8C]'>29</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Section */}
        <div className='w-7xl flex-1 overflow-x-auto p-0'>
          <Card className='h-full min-h-full rounded-[16px] border-none bg-white p-0'>
            <CardContent className='p-0'>
              {/* Header */}
              <div className='rounded-xl bg-[#272727] text-white'>
                <div className='grid grid-cols-6 gap-4 p-4 text-sm font-semibold uppercase'>
                  <div className='text-center'>Rank</div>
                  <div className='text-center'>User</div>
                  <div className='text-center'>Number of IP owned</div>
                  <div className='text-center'>Total Impact Score</div>
                  <div className='text-center'>$REBAZ spent</div>
                  <div>Staked $REBAR</div>
                </div>
              </div>

              {/* Leaderboard Rows */}
              <div className='mt-2 flex flex-col gap-2'>
                {leaderboardData.map((item) => {
                  const avatarUrl = getAvatarUrl(item.user)
                  return (
                    <div
                      key={item.rank}
                      className='grid grid-cols-12 items-center gap-4 rounded-xl bg-[#D9E0EC33] p-1.5 text-black transition-all duration-100 hover:bg-gray-50 hover:outline hover:outline-black'
                    >
                      <div className='bg-[#ECF9F033] text-center text-lg font-bold text-black'>
                        {item.rank}
                      </div>
                      <div className='col-span-3 col-start-2 flex items-center gap-2 text-black'>
                        <div className='h-[40px] min-h-[40px] w-[40px] min-w-[40px] overflow-hidden rounded-xl p-0'>
                          {avatarUrl ? (
                            <Image
                              src={avatarUrl}
                              alt='Avatar'
                              width={40}
                              height={40}
                              className='h-full w-full rounded-[10px] border border-[#101828] object-cover'
                            />
                          ) : (
                            <div className='flex h-full w-full items-center justify-center'>
                              <Image
                                src='/avatar1.png'
                                alt='Avatar'
                                width={40}
                                height={40}
                                className='h-full w-full object-cover'
                              />
                            </div>
                          )}
                        </div>
                        <span className='truncate text-sm font-semibold'>
                          {item.user}
                        </span>
                      </div>
                      <div className='col-span-2 text-center font-semibold'>
                        {item.impact}
                      </div>
                      <div className='col-span-2 text-center font-semibold'>
                        {item.earned}
                      </div>
                      <div className='col-span-2 text-center font-semibold'>
                        ${item.sold}
                      </div>
                      <div className='col-span-2 text-center font-semibold'>
                        ${item.staked}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
