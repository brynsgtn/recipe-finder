import React from 'react';
import { Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../Styles/Header.module.css';

const links = [
  { link: '/about', label: 'Home' },
  {
    link: '#1',
    label: 'Category',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Favorites' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transition={{ duration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <MantineLogo size={28} />
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Menu opened={opened} onClose={() => toggle(false)} transition={{ duration: 0 }} position="bottom">
             <Menu.Dropdown>{items}</Menu.Dropdown>
          </Menu>
        </div>
      </Container>
    </header>
  );
}
