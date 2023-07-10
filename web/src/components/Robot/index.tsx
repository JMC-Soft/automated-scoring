'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import RobotHead from '$/images/robot/robot-head.png';
import RobotBody from '$/images/robot/robot-body.png';
import RobotFoot from '$/images/robot/robot-foot.png';
import RobotLeftHand from '$/images/robot/robot-left-hand.png';
import './style.css';

function Robot({ isRunning }: { isRunning: boolean }) {
  return (
    <div
      className={clsx('absolute bottom-0 h-[11.87vw] w-[10vw] scale-0', {
        running: isRunning,
      })}
    >
      <Image
        src={RobotHead}
        alt="로봇 머리"
        style={{
          position: 'absolute',
          width: 'calc(404 / 738 * 100%)',
          left: 'calc(73 / 738 * 100%)',
        }}
        className={clsx({
          'robot-head': isRunning,
        })}
      />
      <Image
        style={{
          position: 'absolute',
          width: 'calc(146 / 738 * 100%)',
          top: 'calc(416 / 876 * 100%)',
        }}
        src={RobotLeftHand}
        alt="로봇 왼팔"
        className={clsx({
          'robot-arm': isRunning,
        })}
      />
      <Image
        style={{
          position: 'absolute',
          width: 'calc(619 / 738 * 100%)',
          top: 'calc(327 / 876 * 100%)',
          left: 'calc(119 / 738 * 100%)',
        }}
        src={RobotBody}
        alt="로봇 몸통"
      />
      <Image
        style={{
          position: 'absolute',
          width: 'calc(134 / 738 * 100%)',
          top: 'calc(694 / 876 * 100%)',
          left: 'calc(154 / 738 * 100%)',
          zIndex: 50,
        }}
        src={RobotFoot}
        alt="로봇 왼발"
        className={clsx({
          'robot-foot-left': isRunning,
        })}
      />
      <Image
        style={{
          position: 'absolute',
          width: 'calc(134 / 738 * 100%)',
          top: 'calc(694 / 876 * 100%)',
          left: 'calc(293 / 738 * 100%)',
        }}
        src={RobotFoot}
        alt="로봇 오른발"
        className={clsx({
          'robot-foot-right': isRunning,
        })}
      />
    </div>
  );
}

export default Robot;
