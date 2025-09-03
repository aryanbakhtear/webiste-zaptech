# Steam Accounts Admin System

## How It Works

This system allows you to publish Steam accounts from your phone and display them on your website for users to see.

## Setup Instructions

### 1. Admin Access
- **Password**: `Aryan961.` (as set in your steamacc.html)
- **Access from phone**: Visit `/admin.html` on your website

### 2. Publishing New Accounts

#### Option A: Use the Admin Panel (Recommended)
1. Go to `/admin.html` from your phone
2. Enter Steam account details in the textarea
3. Click "Publish Account"
4. The account is immediately visible to users

#### Option B: Use the Main Page
1. Go to `/steamacc.html`
2. Click the admin icon (🔐) in the bottom right
3. Enter password: `Aryan961.`
4. Paste account details and publish

### 3. Account Format
You can paste account details in any format. Example:
```
Email: example@email.com
Password: password123
Games: CS:GO, Dota 2
Notes: Premium account with rare items
```

## How Users See Accounts

- Users visit `/steamacc.html`
- They see all published Steam accounts
- Can search through accounts
- Can copy account details
- Pagination for many accounts

## Data Storage

- **Immediate storage**: localStorage (works instantly)
- **Permanent storage**: JSON file (`steamacc.json`)
- **Sync**: Use "Export to JSON" button to download updated file

## File Structure

```
steamacc.html          - Main page users see
admin.html             - Mobile-friendly admin panel
steamacc.json          - Stores all accounts
steamacc.css           - Styling (untouched)
```

## Mobile Usage

The `/admin.html` page is designed specifically for mobile:
- Large buttons and text
- Touch-friendly interface
- Responsive design
- Easy account management

## Security

- Admin password protected
- Only you know the password
- Users can only view accounts, not edit them

## Troubleshooting

**Accounts not showing?**
- Check if you're logged in as admin
- Refresh the page
- Check browser console for errors

**Can't publish?**
- Make sure you're on the admin panel
- Check if password is correct
- Try refreshing the page

## Quick Start

1. Visit `/admin.html` on your phone
2. Enter Steam account details
3. Click "Publish Account"
4. Users can immediately see the new account on `/steamacc.html`

That's it! Your Steam accounts system is now fully functional. 🎮✨ 